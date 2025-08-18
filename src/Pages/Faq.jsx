import React from 'react';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Card } from "flowbite-react";

const Faq = () => {
    return (
    <div className="max-w-10/12 mx-auto my-10">
           <h2 className="text-3xl font-bold text-center mb-5">Frequently Asked Questions</h2>
         <Card>
         <Accordion collapseAll>
      <AccordionPanel>
        <AccordionTitle>What types of insurance policies does NewLeaf offer?</AccordionTitle>
        <AccordionContent>
          <p className="text-gray-500 dark:text-gray-400">
            We offer a wide range of policies including health insurance, life insurance, auto insurance, home insurance, 
            and travel insurance. Each plan can be customized to meet your personal or family needs.
          </p>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel>
        <AccordionTitle>How do I buy a policy online?</AccordionTitle>
        <AccordionContent>
          <p className="text-gray-500 dark:text-gray-400">
            Simply create an account, browse through our available policies, compare benefits, and choose the one that 
            fits your needs. You can complete the purchase securely online within minutes.
          </p>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel>
        <AccordionTitle>Can I manage my policy through the dashboard?</AccordionTitle>
        <AccordionContent>
          <p className="text-gray-500 dark:text-gray-400">
            Yes, once logged in, you can access your dashboard to view policy details, track claims, update personal 
            information, and renew your policies without visiting a branch office.
          </p>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel>
        <AccordionTitle>How do I file an insurance claim?</AccordionTitle>
        <AccordionContent>
          <p className="text-gray-500 dark:text-gray-400">
            You can file a claim directly through the dashboard by uploading the necessary documents and filling out 
            the claim form. Our support team will then review and process your request promptly.
          </p>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel>
        <AccordionTitle>Is my data safe on NewLeaf?</AccordionTitle>
        <AccordionContent>
          <p className="text-gray-500 dark:text-gray-400">
            Absolutely. We use industry-standard encryption and secure servers to protect your personal and financial 
            information. Your data privacy and security are our top priorities.
          </p>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel>
        <AccordionTitle>What should I do if I forget my account password?</AccordionTitle>
        <AccordionContent>
          <p className="text-gray-500 dark:text-gray-400">
            On the sign-in page, click “Forgot Password” and follow the instructions to reset it. 
            You’ll receive a secure password reset link in your registered email.
          </p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
     </Card>
    </div>
    );
};

export default Faq;
