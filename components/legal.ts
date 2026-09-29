// Website legal copy for /privacy and /terms.
//
// DRAFT FOR LEGAL REVIEW — this is professional placeholder copy structured so
// counsel can review and finalise it. It intentionally makes no compliance or
// certification claims (no HIPAA/ABDM/ISO/SOC 2/DPDP-certification statements)
// and no specific security guarantees beyond "reasonable measures".
// Entity is named "TrueSpur"; governing law is India (no city specified).

import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site"

export interface LegalSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface LegalDoc {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

const OPERATOR = `Clinax is a product operated by TrueSpur ("TrueSpur", "we", "us" or "our").`

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  updated: "Last updated: September 2026",
  intro: `${OPERATOR} This Privacy Policy explains how we collect, use, disclose and protect information through the Clinax website at ${SITE_URL} (the "Website") and through demo and early-access requests submitted on it.`,
  sections: [
    {
      heading: "Scope of this policy",
      paragraphs: [
        `This policy covers the information we collect through this Website — for example, when you request early access or a demo, or contact us. It does not describe how patient data is handled inside the Clinax product itself; that is governed by the agreement between TrueSpur and each clinic using Clinax.`,
      ],
    },
    {
      heading: "Information we collect",
      paragraphs: ["We collect information you choose to give us and limited technical information when you use the Website:"],
      bullets: [
        "Contact and request details you submit through our forms — your name, work email, phone number, clinic name, role, number of branches and anything you include in your message.",
        "Communications — if you email us, we keep the correspondence and the details it contains.",
        "Technical information — limited data such as pages visited, browser and device type, and approximate location, collected through privacy-friendly analytics.",
      ],
    },
    {
      heading: "How we use your information",
      bullets: [
        "To respond to your demo or early-access request and communicate with you about it.",
        "To understand your clinic's needs and tailor any walkthrough or onboarding discussion.",
        "To send occasional product updates where you would reasonably expect them — you can opt out at any time.",
        "To operate, secure and improve the Website.",
        "To meet legal, regulatory or accounting obligations where required.",
      ],
    },
    {
      heading: "Cookies and analytics",
      paragraphs: [
        "We use privacy-friendly, cookie-less analytics to understand aggregate Website usage. We do not use advertising or cross-site tracking cookies. If this changes, we will update this policy.",
      ],
    },
    {
      heading: "How we share information",
      paragraphs: [
        "We do not sell your personal information. We share it only with:",
      ],
      bullets: [
        "Service providers that help us run the Website and communicate with you (hosting, email delivery and analytics providers), under obligations to protect it.",
        "Our affiliates and team members who need it to respond to your request.",
        "Authorities or other parties where required by law or to protect rights, safety and security.",
        "A successor entity if TrueSpur or Clinax is involved in a merger, acquisition or similar transaction.",
      ],
    },
    {
      heading: "Data security",
      paragraphs: [
        "We use reasonable technical and organisational measures to protect the information we hold. No method of transmission or storage is completely secure, so we cannot guarantee absolute security — but we work to keep the risk proportionate and low.",
      ],
    },
    {
      heading: "Data retention",
      paragraphs: [
        "We keep your information only as long as needed for the purposes described above — for example, while we are working with you on a demo, early access or onboarding — and to meet legal or accounting requirements. You can ask us to delete it sooner (see Your rights).",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        `Subject to applicable law — including applicable Indian data protection law — you may ask us to access, correct or delete your personal information, or to stop using it for a particular purpose. Email us at ${CONTACT_EMAIL} and we will respond within a reasonable timeframe.`,
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "The Website is intended for business users and is not directed at children. We do not knowingly collect personal information from children.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The latest version will always be on this page, with the updated date shown above.",
      ],
    },
    {
      heading: "Contact us",
      paragraphs: [
        `Questions about this policy or how we handle your information? Email ${CONTACT_EMAIL}.`,
      ],
    },
  ],
}

export const TERMS: LegalDoc = {
  title: "Terms of Service",
  updated: "Last updated: September 2026",
  intro: `${OPERATOR} These Terms of Service ("Terms") govern your use of the Clinax website at ${SITE_URL} (the "Website"). By using the Website you agree to these Terms. If you do not agree, please do not use the Website.`,
  sections: [
    {
      heading: "About the Website and Clinax",
      paragraphs: [
        "The Website describes Clinax, a clinical operating system for physiotherapy and rehabilitation clinics, and lets you request early access or a demo. Content on the Website — including descriptions of product capabilities and direction — is provided for general information only and is not a binding offer or a product specification.",
        `Use of the Clinax product itself is governed by a separate agreement between TrueSpur and the clinic or organisation using it, not by these Terms. Submitting a demo or early-access request does not guarantee access to the product.`,
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        `The Website and its content — including text, design, screenshots, logos and the ${SITE_NAME} name — are owned by or licensed to TrueSpur and protected by intellectual property laws. You may view and share links to the Website, but you may not copy, reproduce, modify or redistribute its content without our written permission.`,
      ],
    },
    {
      heading: "Acceptable use",
      paragraphs: ["When using the Website you agree not to:"],
      bullets: [
        "Use it for any unlawful purpose or in violation of applicable law.",
        "Submit false, misleading or another person's information through our forms.",
        "Attempt to probe, disrupt or gain unauthorised access to the Website or its infrastructure.",
        "Scrape or bulk-collect content or data from the Website.",
      ],
    },
    {
      heading: "Third-party links",
      paragraphs: [
        "The Website may link to third-party sites (for example, the TrueSpur corporate site). We are not responsible for their content or practices; their own terms and policies apply.",
      ],
    },
    {
      heading: "No medical or professional advice",
      paragraphs: [
        "Nothing on the Website constitutes medical, clinical, legal or professional advice. Product content describes software workflows, not clinical practice.",
      ],
    },
    {
      heading: "Disclaimer",
      paragraphs: [
        `The Website is provided "as is" and "as available". To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose and non-infringement. We do not warrant that the Website will be uninterrupted, error-free or free of harmful components.`,
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, TrueSpur and its affiliates will not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits, data or goodwill, arising from or related to your use of the Website. Our aggregate liability for any claim relating to the Website will not exceed the amount you paid us to use the Website — which, for a free website, is nil.",
      ],
    },
    {
      heading: "Changes to these Terms",
      paragraphs: [
        "We may update these Terms from time to time. The latest version will always be on this page, with the updated date shown above. Continued use of the Website after changes means you accept the updated Terms.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These Terms are governed by the laws of India. Any disputes arising from or relating to these Terms or the Website will be subject to the jurisdiction of the competent courts of India.",
      ],
    },
    {
      heading: "Contact us",
      paragraphs: [
        `Questions about these Terms? Email ${CONTACT_EMAIL}.`,
      ],
    },
  ],
}
