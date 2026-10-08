async function checkPremiumAccess() {

    const status = document.getElementById("access-status");
    const content = document.getElementById("premium-content");

    const { data: { session } } =
        await supabaseClient.auth.getSession();

    if (!session) {

        status.innerHTML =
            "Please login to access Crypto Atlas Premium.";

        return;
    }

    const userId = session.user.id;

    const { data, error } = await supabaseClient
        .from("profiles")
        .select("membership, premium_until")
        .eq("id", userId)
        .single();

    if (error) {

        console.error("Premium access error:", error);

        status.innerHTML =
            "Could not check membership.";

        return;
    }

    const isPremium =
        data.membership === "premium";

    const hasValidPremium =
        data.premium_until &&
        new Date(data.premium_until) > new Date();

    if (isPremium && hasValidPremium) {

        status.innerHTML =
            "Premium access confirmed.";

        content.style.display = "block";

    } else {

        status.innerHTML =
            "This content is available for Crypto Atlas Premium Members.";

        content.style.display = "none";
    }
}

checkPremiumAccess();
