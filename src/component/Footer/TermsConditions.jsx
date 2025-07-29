import React from 'react';

const TermsConditions = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
            
            <p className="mb-4">
                Welcome to NewLeaf Insurance. These Terms and Conditions ("Terms") govern your use of our website, services, and digital platforms. By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
            <p className="mb-4">
                You must be at least 18 years old and capable of entering into a legally binding agreement to use our platform and purchase insurance policies.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. Account Registration</h2>
            <p className="mb-4">
                When creating an account, you agree to provide accurate, complete, and up-to-date information. You are responsible for maintaining the confidentiality of your login credentials.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Policy Applications</h2>
            <p className="mb-4">
                Submitting a policy application does not guarantee approval. Applications are reviewed by authorized agents or administrators, and eligibility is determined based on our underwriting guidelines.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Payment Terms</h2>
            <p className="mb-4">
                Premiums must be paid on time as per the selected frequency (monthly/yearly). Non-payment may result in policy cancellation or claim denial. Stripe is used for secure online payments.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. User Conduct</h2>
            <p className="mb-4">
                You agree not to misuse the platform, submit false applications, harass other users, or engage in fraudulent activities.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. Intellectual Property</h2>
            <p className="mb-4">
                All content on this platform, including text, images, logos, and code, is the property of NewLeaf Insurance and protected by applicable copyright laws.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Policy Modifications</h2>
            <p className="mb-4">
                We reserve the right to modify or terminate policies, features, or these Terms at any time. Any changes will be posted on this page with an updated effective date.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">8. Limitation of Liability</h2>
            <p className="mb-4">
                We are not liable for any damages arising from your use of our services, including lost profits, data loss, or personal injury unless caused by our proven negligence.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">9. Governing Law</h2>
            <p className="mb-4">
                These Terms are governed by and construed in accordance with the laws of your country of residence. Disputes shall be resolved through arbitration or appropriate legal channels.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
            <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:support@newleafinsurance.com" className="text-blue-600 underline">support@newleafinsurance.com</a>.
            </p>
        </div>
    );
};

export default TermsConditions;
