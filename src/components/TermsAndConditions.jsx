import Reveal from "./animations/Reveal";

export default function TermsAndConditions() {
  return (
    <div className="relative isolate px-6 lg:px-8 mt-16 sm:mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Reveal
            delay={0.1}
            className="mb-4 sm:mb-4 sm:flex sm:justify-center text-center"
          >
            <div className="inline-flex items-center">
              <div className="rounded-xl w-[14px] h-2 mr-2 bg-[#5371FF]" />
              <p className="uppercase text-sm leading-[14px] text-[#5371FF]">
                Legal
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <h1 className="mx-auto max-w-2xl text-center text-4xl font-semibold text-pretty text-zinc-900 sm:text-5xl">
              Terms of Service
            </h1>
          </Reveal>
        </div>

        <div className="mt-16">
          <div className="text-center text-zinc-600 mb-12">
            Last updated: 1 APRIL 2024
          </div>

          <div className="space-y-8 text-zinc-600">
            <p>
              Please read these terms of service carefully before using Our Service.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">1 - Interpretation and Definitions</h2>
            
            <h3 className="text-xl font-semibold text-zinc-800 mb-4">1.1 - Interpretation</h3>
            <p className="text-zinc-600 mb-6">
              The words of which the initial letter is capitalized have meanings defined under the following conditions. 
              The following definitions shall have the same meaning regardless of whether they appear in the singular or in the plural.
            </p>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">1.2 - Definitions</h3>
            <p className="text-zinc-600 mb-4">For the purposes of these Terms of Service:</p>
            
            <ul className="list-none space-y-4 text-zinc-600">
              <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
              <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for the election of directors or other managing authority.</li>
              <li><strong>Application</strong> means the software program provided by the Company or Operator downloaded by You on any electronic device, named HARBR.</li>
              <li><strong>Buyer</strong> refers to users of the Service who are placing Orders for Goods.</li>
              <li><strong>Country</strong> refers to AUSTRALIA.</li>
              <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to HARBR PTY LTD, SUITE 302 13/15 WENTWORTH AVE, SYDNEY NSW, 2000, ABN/ACN: 15 685 512 154.</li>
              <li><strong>Content</strong> refers to content such as text, images, or other information that can be posted, uploaded, linked to, or otherwise made available by You, regardless of the form of that content.</li>
              <li><strong>Device</strong> means any device that can access the Service such as a computer, a cell phone, or a digital tablet.</li>
              <li><strong>Feedback</strong> means feedback, innovations, or suggestions sent by You regarding the attributes, performance, or features of our Service.</li>
              <li><strong>Good</strong> refers to the items or services offered for sale, rental, auction, contact, or any other means of trading on the Service.</li>
              <li><strong>Operator</strong> (referred to as either "the Operator", "We", "Us" or "Our" in this Agreement) refers to HARBR PTY LTD.</li>
              <li><strong>Order</strong> means a request by You to purchase or trade by any means Goods on the Application or Website.</li>
              <li><strong>Seller</strong> refers to users of the Service who are listing Goods and making them available for trade by any means.</li>
              <li><strong>Service</strong> refers to the Application or the Website or both.</li>
              <li><strong>Terms of Service</strong> (also referred to as "Terms") mean these Terms of Service that form the entire agreement between You and the Company or Operator regarding the use of the Service.</li>
              <li><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products, or services) provided by a third party that may be displayed, included, or made available by the Service.</li>
              <li><strong>Website</strong> refers to HARBR accessible from WWW.HARBRAPP.COM.</li>
              <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">2 - Contact Us</h2>
            <p className="text-zinc-600 mb-4">If you have any questions about these Terms of Service, You can contact us:</p>
            <ul className="list-none space-y-2 text-zinc-600">
              <li>By email: <a href="mailto:HARBRHQ@GMAIL.COM" className="text-blue-600 hover:text-blue-800">HARBRHQ@GMAIL.COM</a></li>
              <li>By visiting this page on our website: <a href="https://WWW.HARBRAPP.COM" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">WWW.HARBRAPP.COM</a></li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">3 - Acknowledgment</h2>
            <div className="space-y-4 text-zinc-600">
              <p>
                These are the Terms of Service governing the use of this Service and the agreement that operates between You and the Company or Operator. 
                These Terms of Service set out the rights and obligations of all users regarding the use of the Service.
              </p>
              <p>
                Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms of Service. 
                These Terms of Service apply to all visitors, users, and others who access or use the Service.
              </p>
              <p>
                By accessing or using the Service You agree to be bound by these Terms of Service. 
                If You disagree with any part of these Terms of Service then You may not access the Service.
              </p>
              <p>
                You represent that you are over the age of majority according to the laws of your country or the Country, whichever is higher. 
                The Company or Operator does not permit those under that age to use the Service.
              </p>
              <p>
                Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company or Operator. 
                Our Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your personal information when You use the Application or Website and tells You about Your privacy rights and how the law protects You. 
                Please read Our Privacy Policy carefully before using Our Service.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">4 - Governing Law</h2>
            <p className="text-zinc-600 mb-8">
              The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. 
              Your use of the Application or Website may also be subject to other local, state, national, or international laws.
            </p>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">4.1 - For European Union (EU) Users</h3>
            <p className="text-zinc-600 mb-8">
              If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident.
            </p>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">4.2 - United States Legal Compliance</h3>
            <p className="text-zinc-600 mb-8">
              You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.
            </p>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">4.3 - Severability</h3>
            <p className="text-zinc-600 mb-8">
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force, and effect.
            </p>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">4.4 - Waiver</h3>
            <p className="text-zinc-600">
              Except as provided herein, the failure to exercise a right or to require the performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">5 - User Accounts</h2>
            
            <h3 className="text-xl font-semibold text-zinc-800 mb-4">5.1 - Account Creation</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                When You create an account with Us, You must provide Us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.
              </p>
              <p>
                You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">5.2 - Account Information</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>You may be asked to supply certain information relevant to Your Account including, without limitation, Your name, Your email, Your phone number, and Your address.</p>
              <p>You may have to provide documents to comply with identity verification.</p>
              <p>Before or during posting Goods, you may be asked to supply, without limitation, Your bank account details, and Your identity documents.</p>
              <p>Before or during placing an Order, you may be asked to supply, without limitation, Your credit card number, the expiration date of Your credit card, Your billing address, and Your shipping information.</p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">5.3 - Account Review</h3>
            <p className="text-zinc-600 mb-8">
              Unless part of a feature of the Service, We do not perform background checks or endorse any users. We do not accept any responsibility for the reliability, accuracy, and completeness of any information provided by users.
            </p>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">5.4 - Account Password</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service.
              </p>
              <p>
                You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">5.5 - Account Termination</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                We may terminate or suspend Your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms of Service. Upon termination, Your right to use the Service will cease immediately.
              </p>
              <p>
                If You wish to terminate Your Account, You may simply discontinue using the Service or delete Your Account from the Service, or contact Us for help.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">6 - Content</h2>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">6.1 - Your Right to Post Content</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                Our Service allows You to post Content. You are responsible for the Content that You post to the Service, including its legality, reliability, and appropriateness.
              </p>
              <p>
                By posting Content to the Service, You grant Us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of Your rights to any Content You submit, post, or display on or through the Service and You are responsible for protecting those rights. You agree that this license includes the right for Us to make Your Content available to other users of the Service, who may also use Your Content subject to these Terms.
              </p>
              <p>
                You represent and warrant that: (i) the Content is Yours (You own it) or You have the right to use it and grant Us the rights and license as provided in these Terms, and (ii) the posting of Your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">6.2 - Content Restrictions</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                The Company or Company or Operator is not responsible for the content of the Service's users. You expressly understand and agree that You are solely responsible for the Content and for all activity that occurs under your account, whether done so by You or any third person using Your account.
              </p>
              <p>
                You may not transmit any Content that is unlawful, offensive, upsetting, intended to disgust, threatening, libelous, defamatory, obscene, or otherwise objectionable. Examples of such objectionable Content include, but are not limited to, the following:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unlawful or promoting unlawful activity.</li>
                <li>Defamatory, discriminatory, or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin, or other targeted groups.</li>
                <li>Spam, machine, or randomly–generated, constituting unauthorized or unsolicited advertising, chain letters, any other form of unauthorized solicitation, or any form of lottery or gambling.</li>
                <li>Containing or installing any viruses, worms, malware, trojan horses, or other content that is designed or intended to disrupt, damage, or limit the functioning of any software, hardware, or telecommunications equipment or to damage or obtain unauthorized access to any data or other information of a third person.</li>
                <li>Infringing on any proprietary rights of any party, including patent, trademark, trade secret, copyright, right of publicity, or other rights.</li>
                <li>Impersonating any person or entity including the Company or Operator and its employees or representatives.</li>
                <li>Violating the privacy of any third person.</li>
                <li>False information and features.</li>
              </ul>
              <p>
                The Company or Operator reserves the right, but not the obligation, to, in its sole discretion, determine whether or not any Content is appropriate and complies with these Terms, refuse or remove this Content. The Company or Operator further reserves the right to make formatting and edits and change the manner of any Content. The Company or Operator can also limit or revoke the use of the Service if You post such objectionable Content. As the Company or Operator cannot control all content posted by users and/or third parties on the Service, you agree to use the Service at your own risk. You understand that by using the Service You may be exposed to content that You may find offensive, indecent, incorrect, or objectionable, and You agree that under no circumstances will the Company or Operator be liable in any way for any content, including any errors or omissions in any content, or any loss or damage of any kind incurred as a result of your use of any content.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">6.3 - Content Backups</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>Although regular backups of Content are performed, the Company or Operator does not guarantee there will be no loss or corruption of data.</p>
              <p>Corrupt or invalid backup points may be caused by, without limitation, Content that is corrupted prior to being backed up or that changes during the time a backup is performed.</p>
              <p>The Company or Operator will provide support and attempt to troubleshoot any known or discovered issues that may affect the backups of Content. But You acknowledge that the Company or Operator has no liability related to the integrity of Content or the failure to successfully restore Content to a usable state.</p>
              <p>You agree to maintain a complete and accurate copy of any Content in a location independent of the Service.</p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">6.4 - Intellectual Property of Others and Copyright Infringement</h3>
            <div className="space-y-4 text-zinc-600">
              <p>We respect the intellectual property and copyrights of others. You may be held accountable for damages (including costs and attorneys' fees) for misrepresenting that any Content is infringing Your copyright. It is Our policy to respond to any claim that Content posted on the Service infringes a copyright or other intellectual property infringement of any person.</p>
              <p>We are ready to comply with local regulations in that matter (Digital Millennium Copyright Act (DMCA), EU Copyright Directive, ...).</p>
              <p>If You are a copyright owner or authorized on behalf of one, and You believe that the copyrighted work has been copied in a way that constitutes copyright infringement that is taking place through the Service, You must submit Your notice in writing to the attention of our copyright agent via email (see 3 - Contact Us) and include in Your notice the following information related to the alleged infringement:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright's interest.</li>
                <li>A description of the copyrighted work that You claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work.</li>
                <li>Identification of the URL or other specific location on the Service where the material that You claim is infringing is located.</li>
                <li>Your address, telephone number, and email address.</li>
                <li>A statement by You that You have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
                <li>A statement by You, made under penalty of perjury, that the above information in Your notice is accurate and that You are the copyright owner or authorized to act on the copyright owner's behalf.</li>
              </ul>
              <p>Upon receipt of a notification, the Company or Operator will take whatever action, in its sole discretion, it deems appropriate, including removal of the challenged content from the Service.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">7 - Orders of Goods</h2>
            <p className="text-zinc-600 mb-8">
              By placing an Order for Goods through the Service, You warrant that You are legally capable of entering into binding contracts.
            </p>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">7.1 - Position of the Service in Orders</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                Our role is one of a facilitator between You and the Sellers, using the Service. We are, therefore, a third party in Orders, which limits Our liabilities in any disputes between You and the Sellers.
              </p>
              <p>
                We are not a party to any agreement You have with the Sellers. Any agreement You enter with the Sellers does not form a part of any agreement We have with you.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">7.2 - Your Information as Buyer</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                If You wish to place an Order for Goods available on the Service, You may be asked to supply certain information relevant to Your Order including, without limitation, Your name, Your email, Your phone number, Your credit card number, the expiration date of Your credit card, Your billing address, and Your shipping information.
              </p>
              <p>
                You represent and warrant that: (i) You have the legal right to use any credit or debit card(s) or other payment method(s) in connection with any Order; and that (ii) the information You supply to us is true, correct, and complete.
              </p>
              <p>
                By submitting such information, You grant us the right to provide the information to payment processing third parties for purposes of facilitating the completion of Your Order.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">7.3 - Availability, Errors, and Inaccuracies</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                We and Sellers are constantly updating Our offerings of Goods on the Service. The Goods available on the Service may be mispriced, described inaccurately, or unavailable, and Sellers and We may experience delays in updating information regarding the Goods on the Service and in Our advertising on other websites.
              </p>
              <p>
                We and Sellers cannot and do not guarantee the accuracy or completeness of any information, including prices, product images, specifications, availability, and services. We reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">7.4 - Prices Policy</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                The Company or Operator and Seller reserve the right to revise their prices at any time prior to accepting an Order.
              </p>
              <p>
                The prices quoted may be revised by the Company or Operator subsequent to accepting an Order in the event of any occurrence affecting delivery caused by government action, variation in customs duties, increased shipping charges, higher foreign exchange costs, and any other matter beyond the control of the Company or Operator or the Seller. In that event, You will have the right to cancel Your Order.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">7.5 - Payments</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                Payment can be made through various payment methods we have available. We rely on payment gateways that have their own terms of service and their own limitations.
              </p>
              <p>
                Payment cards (credit cards or debit cards) are subject to validation checks and authorization by Your card issuer. If we do not receive the required authorization, We will not be liable for any delay or non-delivery of Your Order.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">7.6 - Service Fees</h3>
            <p className="text-zinc-600 mb-8">
              We may charge You some fees (and applicable Taxes) for the right to use the Service. More information about when service fees apply and how they are calculated is displayed during your Order. We reserve the right to change the service fees at any time.
            </p>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">7.7 - Order Modification</h3>
            <p className="text-zinc-600 mb-8">
              You and the Sellers are responsible for any Order modifications you agree to make via the Service and agree to pay any additional amounts, fees, or taxes associated with any Order modification.
            </p>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">7.8 - Order Cancellation</h3>
            
            <h4 className="text-lg font-semibold text-zinc-800 mb-4 mt-6">7.8.1 - Our Order Cancellation Rights</h4>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>We reserve the right to refuse or cancel Your Order at any time for certain reasons including but not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Goods availability</li>
                <li>Errors in the description or prices for Goods</li>
                <li>Errors in Your Order</li>
                <li>Mistakes from the Seller</li>
              </ul>
              <p>We reserve the right to refuse or cancel Your Order if fraud or an unauthorized or illegal transaction or trade is suspected.</p>
            </div>

            <h4 className="text-lg font-semibold text-zinc-800 mb-4">7.8.2 - Order Cancellation by Buyers</h4>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>If You as a Buyer cancel an Order, the amount You paid (including the Service fees) is not refunded.</p>
              <p>If something outside Your control requires You to cancel an Order, or if You think your Order should be refunded, contact Us.</p>
            </div>

            <h4 className="text-lg font-semibold text-zinc-800 mb-4">7.8.3 - Order Cancellation by Sellers</h4>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>If You as a Seller cancel an Order, the amount the Buyer paid (including the Service fees) will be refunded to the Buyer and will not be transferred to the Seller.</p>
              <p>If something outside Your control requires You to cancel an Order, or if You think your Order should be refunded, contact Us.</p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">7.9 - Order Dispute</h3>
            <p className="text-zinc-600 mb-8">
              If a Buyer or a Seller disputes an Order, the Company or Operator should be notified. The dispute will be resolved at Our sole discretion.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">8 - Disclaimer of Warranties and Limitation of Liability</h2>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">8.1 - Limitation of Liability</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                Notwithstanding any damages that You might incur, the entire liability of the Company or Operator and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD (or its equivalent in the Service local currency) if You haven't purchased anything through the Service.
              </p>
              <p>
                To the maximum extent permitted by applicable law, in no event shall the Company or Operator or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or Operator or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these jurisdictions, each party's liability will be limited to the greatest extent permitted by law.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">8.2 - "AS IS" and "AS AVAILABLE" Disclaimer</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company or Operator, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory, or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of the course of dealing, performance, usage or trade practice. Without limitation to the foregoing, the Company or Operator provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems, or services, operate without interruption, meet any performance or reliability standards or be error-free or that any errors or defects can or will be corrected.
              </p>
              <p>
                Without limiting the foregoing, neither the Company nor Operator nor any of the company's providers makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company or Operator are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">8.3 - Links to Other Websites</h3>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>Our Service may contain links to third-party websites or services that are not owned or controlled by the Company or Operator.</p>
              <p>
                The Company or Operator has no control over and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company or Operator shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such web sites or services.
              </p>
              <p>We strongly advise You to read the terms of service and privacy policies of any third-party websites or services that You visit.</p>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 mb-4">8.4 - Translation Interpretation</h3>
            <p className="text-zinc-600 mb-8">
              These Terms of Service may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">9 - Disputes Resolution about the Service</h2>
            <p className="text-zinc-600 mb-8">
              If You have any concerns or disputes about the Service, You agree to first try to resolve the dispute informally by contacting the Company or Operator.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">10 - Intellectual Property of the Service</h2>
            <div className="space-y-4 text-zinc-600 mb-8">
              <p>
                The Service and its original content (excluding Content provided by You or other users), features, and functionality are and will remain the exclusive property of the Company or Operator and its licensors.
              </p>
              <p>
                The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company or Operator.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">11 - Your feedback to Us</h2>
            <p className="text-zinc-600 mb-8">
              You assign all rights, title, and interest in any Feedback You provide the Company or Operator. If for any reason such assignment is ineffective, You agree to grant the Company or Operator a non-exclusive, perpetual, irrevocable, royalty-free, worldwide right and license to use, reproduce, disclose, sub-license, distribute, modify and exploit such Feedback without restriction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">12 - Changes to these Terms of Service</h2>
            <div className="space-y-4 text-zinc-600">
              <p>
                We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
              </p>
              <p>
                By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Application or Website and the Service.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 