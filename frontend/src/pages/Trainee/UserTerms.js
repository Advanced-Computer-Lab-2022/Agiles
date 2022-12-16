import { Link } from "react-router-dom";
function UserTerms() {
  return (
    <div style={{ marginLeft: "10%", marginTop: "3%", width: "80%" }}>
      <h1>Terms of Use:</h1>
      <p>
        Our mission is to improve lives through learning. We enable anyone
        anywhere to create and share educational content (instructors) and to
        access that educational content to learn (students). We consider our
        marketplace model the best way to offer valuable educational content to
        our users. We need rules to keep our platform and services safe for you,
        us, and our student and instructor community. These Terms apply to all
        your activities on the canadian chamber website, the canadian chamber mobile applications, our
        TV applications, our APIs, and other related services (“Services”). If
        you publish a course on the canadian chamber platform, you must also agree to the
        <Link to="/instructor/terms" style={{ color: "#a00477" }}>
          {" "}
          Instructor Terms
        </Link>
        . We also provide details regarding our processing of personal data of
        our students and instructors in our Privacy Policy
      </p>
      <h2>1. Website</h2>
      <p>
        You need an account for most activities on our platform, including to
        purchase and access content or to submit content for publication. When
        setting up and maintaining your account, you must provide and continue
        to provide accurate and complete information, including a valid email
        address. You have complete responsibility for your account and
        everything that happens on your account, including for any harm or
        damage (to us or anyone else) caused by someone using your account
        without your permission. This means you need to be careful with your
        password. You may not transfer your account to someone else or use
        someone else’s account. If you contact us to request access to an
        account, we will not grant you such access unless you can provide us
        with the information that we need to prove you are the owner of that
        account. In the event of the death of a user, the account of that user
        will be closed.
      </p>
      <h2>2. Payments, Credits, and Refunds</h2>
      <h5>2.1 Payments</h5>
      <p>
        You agree to pay the fees for content that you purchase, and you
        authorize us to charge your debit or credit card or process other means
        of payment (such as Boleto, SEPA, direct debit, or mobile wallet) for
        those fees. canadian chamber works with payment service providers to offer you the
        most convenient payment methods in your country and to keep your payment
        information secure. We may update your payment methods using information
        provided by our payment service providers. Check out our Privacy Policy
        for more details. When you make a purchase, you agree not to use an
        invalid or unauthorized payment method. If your payment method fails and
        you still get access to the content you are enrolling in, you agree to
        pay us the corresponding fees within thirty (30) days of notification
        from us. We reserve the right to disable access to any content for which
        we have not received adequate payment.
      </p>
      <h5>2.2 Refunds and Refund Credits</h5>
      <p>
        If the content you purchased is not what you were expecting, you can
        request, within 30 days of your purchase of the content, that canadian chamber
        apply a refund to your account. This refund option does not apply to
        Subscription Plan purchases, which are covered in Section 8.4 below. We
        reserve the right to apply your refund as a refund credit or a refund to
        your original payment method, at our discretion, depending on
        capabilities of our payment service providers, the platform from which
        you purchased your content (website, mobile or TV app), and other
        factors. No refund is due to you if you request it after the 30-day
        guarantee time limit has passed. However, if the content you previously
        purchased is disabled for legal or policy reasons, you are entitled to a
        refund beyond this 30-day limit. canadian chamber also reserves the right to refund
        students beyond the 30-day limit in cases of suspected or confirmed
        account fraud. To request a refund, follow the steps here. As detailed
        in the Instructor Terms, instructors agree that students have the right
        to receive these refunds. If we decide to issue refund credits to your
        account, they will be automatically applied towards your next content
        purchase on our website, but can’t be used for purchases in our mobile
        or TV applications. Refund credits may expire if not used within the
        specified period and have no cash value, in each case unless otherwise
        required by applicable law. At our discretion, if we believe you are
        abusing our refund policy, such as if you’ve consumed a significant
        portion of the content that you want to refund or if you’ve previously
        refunded the content, we reserve the right to deny your refund, restrict
        you from other future refunds, ban your account, and/or restrict all
        future use of the Services. 
      </p>
    </div>
  );
}

export default UserTerms;
