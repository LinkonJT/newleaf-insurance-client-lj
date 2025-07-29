import React from 'react';

const PriPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">
                At NewLeaf Insurance, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, disclose, and safeguard your data when you use our website and services.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
            <p className="mb-4">
                We may collect personal information such as your name, email, address, phone number, date of birth, national ID, and payment details when you:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Register or create an account</li>
                <li>Apply for an insurance policy</li>
                <li>Submit a claim or payment</li>
                <li>Contact support or provide feedback</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
            <p className="mb-4">
                We use your information to:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Process applications and payments</li>
                <li>Verify your identity and eligibility</li>
                <li>Assign agents and manage claims</li>
                <li>Provide personalized quotes and recommendations</li>
                <li>Improve our platform and customer support</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing and Security</h2>
            <p className="mb-4">
                We do not sell your personal information. Your data may be shared securely with authorized agents, third-party payment processors (e.g., Stripe), and service providers for policy processing and management. We follow strict protocols to protect your data.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
            <p className="mb-4">
                You have the right to:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Access, update, or delete your personal data</li>
                <li>Request a copy of your data</li>
                <li>Withdraw consent or deactivate your account</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies & Tracking</h2>
            <p className="mb-4">
                We use cookies and analytics tools to enhance your experience and understand how our services are used. You can manage cookie preferences through your browser settings.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. Updates to This Policy</h2>
            <p className="mb-4">
                This Privacy Policy may be updated occasionally. Changes will be posted here with a revised effective date.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
            <p>
                If you have questions or concerns about this policy, please contact our support team at <a href="mailto:support@newleafinsurance.com" className="text-blue-600 underline">support@newleafinsurance.com</a>.
            </p>
        </div>
    );
};

export default PriPolicy;
