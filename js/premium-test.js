const { data: { session } } = await supabase.auth.getSession();

const status = document.getElementById("access-status");
const content = document.getElementById("premium-content");


if (!session) {

    status.innerHTML =
        "Please login to access Crypto Atlas Premium.";

}
else {

    const userId = session.user.id;


    const { data, error } = await supabase
        .from("profiles")
        .select("membership, premium_until")
        .eq("id", userId)
        .single();


    if (error) {

        status.innerHTML =
            "Could not check membership.";

    }

    else if (data.membership === "premium") {


        status.innerHTML =
            "Premium access confirmed.";

        content.style.display = "block";


    }

    else {


        status.innerHTML =
            "This content is available for Crypto Atlas Premium Members.";

    }

}
