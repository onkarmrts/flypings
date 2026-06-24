import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/db/supabase-server";

// ⚠️  DEV ONLY — this route is completely disabled in production
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
  }

  const { searchParams } = req.nextUrl;

  // Handle delete via ?action=delete
  if (searchParams.get("action") === "delete") {
    await supabase
      .from("instagram_accounts")
      .delete()
      .eq("user_id", user.id)
      .like("ig_user_id", "mock_%");

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings/instagram`
    );
  }

  const username = searchParams.get("username") || "testcreator";

  await supabase.from("instagram_accounts").upsert(
    {
      user_id:         user.id,
      ig_user_id:      `mock_${user.id.slice(0, 8)}`,
      username:        username,
      name:            `${username} (Test)`,
      profile_pic_url: null,
      access_token:    "mock_token_dev_only",
      followers_count: 12400,
      is_active:       true,
    },
    { onConflict: "ig_user_id" }
  );

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings/instagram?success=connected`
  );
}

export async function DELETE(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await supabase
    .from("instagram_accounts")
    .delete()
    .eq("user_id", user.id)
    .like("ig_user_id", "mock_%");

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings/instagram`
  );
}
