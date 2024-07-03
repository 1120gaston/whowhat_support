import React from "react";

import {
  service1, service2, service3, service4, service5, service6,
  special1, special2, special3, special4, special5,
} from "../images";
import { FaAddressBook, FaBloggerB, FaChrome, FaHome, FaPhoneAlt, FaRegNewspaper, FaUserAstronaut, FaUserMd, FaWrench } from "react-icons/fa";

const termsInfo = [
  {
    title: '1. Acceptance of Terms',
    text: ['By registering and using the "Who Supports What" platform (hereinafter referred to as "the Platform"), you agree to comply with and be bound by the following terms and conditions. If you do not agree with these terms, do not use the Platform.'],
  },
  {
    title: '2. User Registration and Verification',
    text: [`To use the Platform's services, you must complete the registration process by providing your full name, a verified email address, a verified phone number, and at least one active social media link. By registering, you agree to provide truthful and accurate information.`],
  },
  {
    title: '3. Uploading Content',
    subTitle: 'When uploading any content to the Platform, including but not limited to screenshots, photos, and comments on social media interactions, you agree and declare that:',
    text: [
      'You are solely responsible for the content you upload.',
      'You have the right and authorization to upload such content.',
      'You understand and agree that the Platform acts solely as an intermediary facilitating the publication of information that is already public.'
    ],
  },
  {
    title: '4. Disclaimer of Liability',
    subTitle: '',
    text: ['The Platform is not responsible for the content uploaded by users. The legal responsibility for any uploaded information rests solely with the user who uploads it. You agree to indemnify and hold the Platform and its administrators harmless from any claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising out of or in connection with the content you upload.'],
  },
  {
    title: '5. Applicable Law',
    subTitle: '',
    text: ['It is your responsibility to ensure that any content you upload complies with the laws applicable in your jurisdiction. The Platform operates under the laws of [insert relevant country/jurisdiction], and any disputes will be resolved under the jurisdiction of the courts of [insert relevant country/jurisdiction].'],
  },
  {
    title: '6. Content Removal Process',
    subTitle: '',
    text: ['Users can request the removal of their information from the Platform by paying a fee of 20 euros for the first request. If the user is mentioned again, the fee will be 70 euros for the second request. No third removal is allowed. The removal process includes verification and approval by the Platform administrators.'],
  },
  {
    title: '7. User Responsibilities',
    subTitle: 'By using the Platform, you agree to:',
    text: [
      'Respect the privacy and rights of others.',
      'Not upload any content that is false, misleading, defamatory, or infringes on any rights of third parties.',
      'Use the Platform for lawful purposes only.',
    ],
  },
  {
    title: '8. Notifications and Updates',
    subTitle: '',
    text: ['The Platform may send notifications to users regarding profile creation and updates. By registering, you agree to receive such notifications.'],
  },
  {
    title: '9. Modification of Terms',
    subTitle: '',
    text: ['The Platform reserves the right to modify these terms and conditions at any time. Modifications will be effective immediately upon posting on the Platform. It is your responsibility to review the terms periodically to stay informed of any changes.'],
  },
  {
    title: '10. Immediate Review Request',
    subTitle: '',
    text: ['If you believe you have been unfairly named on the Platform, you may contact the administration for an immediate review of your case. The administration will investigate and take appropriate action based on their findings.'],
  },
  {
    title: '11. Payment Transactions',
    subTitle: '',
    text: ['The Platform integrates with payment gateways for processing removal request fees. All payment transactions will be tracked, and this information may be made public to ensure transparency.'],
  },
  {
    title: '12. Data Privacy',
    subTitle: '',
    text: ['The Platform is committed to protecting your privacy. All personal data provided during registration and verification will be handled in accordance with our Privacy Policy [insert link to Privacy Policy].'],
  },
  {
    title: '13. Contact Information',
    subTitle: '',
    text: ['If you have any questions or concerns regarding these terms and conditions, please contact the Platform administration team at [insert contact method].'],
  },
]

const privacyInfo = [
  {
    title: '1. Information We Collect',
    subTitle: 'We may collect and process the following data about you:',
    text: [
      'Personal Identification Information: Full name, email address, phone number, and social media links provided during registration.',
      'Verification Data: Information used to verify your identity, such as email and phone number verification codes.',
      'Uploaded Content: Screenshots, photos, and comments related to social media interactions.',
      'Technical Data: IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access the Platform.',
      'Usage Data: Information about how you use our website, products, and services.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    subTitle: '',
    text: [
      'To Provide and Manage the Service: Including user registration, profile creation, content upload, and verification.',
      'To Improve the Platform: Analyzing usage data to enhance user experience and improve our services.',
      'To Communicate with You: Sending notifications about profile creation, updates, and other administrative information.',
      'To Ensure Compliance: Ensuring users adhere to our Terms and Conditions and verifying the authenticity of the uploaded content.',
      'To Process Payments: Handling payments for information removal requests and other transactions.',
    ],
  },
  {
    title: '3. How We Share Your Information',
    subTitle: 'We do not sell, trade, or otherwise transfer your personal information to outside parties except as described below:',
    text: [
      'Service Providers: We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.',
      'Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).',
      'Protection of Rights: We may disclose your information to protect our rights, privacy, safety, or property, and/or that of our affiliates, you, or others.',
    ],
  },
  {
    title: '4. Data Security',
    subTitle: '',
    text: [
      `We implement a variety of security measures to maintain the safety of your personal information.`,
      `All sensitive information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our payment gateway providers' database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential. `,
    ],
  },
  {
    title: '5. Data Retention',
    subTitle: '',
    text: [
      'We will retain and use your information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies. ',
      'Non-personal identification information may be retained indefinitely for analytical purposes.',
    ],
  },
]

const supportInfo = {
  fullName: 'Test Example',
  email: 'support@whosupportswhat.com',
  phone: '+49 1234 56789',
  address: '123 Transparency Street, Online City, Web'
}

const navLinkInfo = [
  {
    title: 'Home',
    link: '/',
    icon: <FaHome />
  },
  {
    title: 'About',
    link: '/about',
    icon: <FaAddressBook />
  },
  {
    title: 'Service',
    link: '/service',
    icon: <FaWrench />
  },
  {
    title: 'Contact',
    link: '/contact',
    icon: <FaPhoneAlt />
  },
  {
    title: 'Blog',
    link: '/blog',
    icon: <FaBloggerB />
  },
  {
    title: 'Deleted',
    link: '/deletedBlogs',
    icon: <FaBloggerB />
  },
]

const serviceInfo = [
  {
    img: service1,
    title: 'Strategy',
    content: 'Our team of strategists and analysts use in-depth user and market research, intuitive information architecture, and product roadmaps to help lay the groundwork for success.'
  },
  {
    img: service2,
    title: 'GOAL-DRIVEN DESIGN',
    content: 'Our digital economy runs on results. We believe in goal-driven design, pinpointing the intersection between business goals, user goals, and the products designed to bring them together.'
  },
  {
    img: service3,
    title: 'Content',
    content: 'With a focus on customer engagement, we create immersive brand experiences and content that captivates, compels, and converts. It‘s not enough to tell your brand"s story.'
  },
  {
    img: service4,
    title: 'LEAN TEAMS',
    content: 'Each team has a concise number of multi-disciplinary team members who wear a lot of hats. This approach cuts down on overhead and eliminates unnecessary communication channels that cost time and money.'
  },
  {
    img: service5,
    title: 'TECHNOLOGY AGNOSTIC',
    content: 'Hammers ≠ screwdrivers, and businesses run on a variety of solutions. We don’t subscribe to a specific set of technologies. Our engineering team delivers the right products that make sense for you.'
  },
  {
    img: service6,
    title: 'FEWER PRESENTATIONS',
    content: 'Creating exceptional products demands dedication, iterative testing, and a collaborative partnership with our clients. Our mission is to craft superior products by leveraging rigorous effort, continuous improvement, and transparent collaboration.'
  },
]

const specialInfo = [
  {
    img: special1,
    title: 'Portrait',
  },
  {
    img: special2,
    title: 'Sports',
  },
  {
    img: special3,
    title: 'Travel',
  },
  {
    img: special4,
    title: 'Wildlife',
  },
  {
    img: special5,
    title: 'Under Water',
  },
]

const adminSideBarInfo = [
  {
    title: 'Dashboard',
    link: '/admin/dashboard',
    icon: <FaChrome />
  },
  {
    title: 'New Blogs',
    link: '/admin/newBlogs',
    icon: <FaRegNewspaper />
  },
  {
    title: 'Users',
    link: '/users',
    icon: <FaUserAstronaut />
  },

]

const adminInfo = [
  {
    all: 'All Blogs: ' + (487 + 16),
    number: 487,
    title: 'Blogs',
    color: 'primary',
    progress: (487 / (487 + 16) * 100).toFixed(2) + '%',
  },
  {
    all: 'All Blogs: ' + (487 + 16),
    number: 16,
    title: 'New Blogs',
    color: 'success',
    progress: (16 / (487 + 16) * 100).toFixed(2) + '%',
  },
  {
    all: 'All Users: ' + 201,
    number: 168,
    title: 'Now Users',
    color: 'danger',
    progress: (168 / 201 * 100).toFixed(2) + '%',
  },
  {
    all: 'USD $',
    number: '$62523',
    title: 'Revenue',
    color: 'warning',
    progress: '100%'
  },
]

const blogType = [
  'All', 'Far-right', 'Xenophobia', 'Palestine-Israel', 'Ukraine', 'Russia', 'Trump', 'Racism', 'LGTBI', 'Other',
]

const blogType1 = [
  'Far-right', 'Xenophobia', 'Palestine-Israel', 'Ukraine', 'Russia', 'Trump', 'Racism', 'LGTBI', 'Other',
]

const profileFieldInfo = [
  {
    label: 'Full Name ',
    name: 'fullName',
  },
  {
    label: 'Phone Number ',
    name: 'mobile',
  },
  {
    label: 'Gender ',
    name: 'gender',
  },
  {
    label: 'City ',
    name: 'city',
  },
  {
    label: 'State ',
    name: 'state',
  },
  {
    label: 'Zip Code ',
    name: 'zipcode',
  },
  {
    label: 'Country ',
    name: 'country',
  },
  {
    label: 'Address ',
    name: 'address',
  },
  {
    label: 'Link',
    name: 'link'
  }
]

export {
  termsInfo, privacyInfo,
  supportInfo, navLinkInfo, serviceInfo, specialInfo,
  adminSideBarInfo, adminInfo, blogType, blogType1, profileFieldInfo
}