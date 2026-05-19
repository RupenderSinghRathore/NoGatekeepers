const today = new Date();

const isoDaysFromNow = (days) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const mockTips = [
  {
    id: "tip-1",
    title: "Prof. Sharma only writes recs for students who visited office hours twice",
    category: "Faculty",
    college: "NIT Trichy",
    branch: "CSE",
    urgency: "Critical",
    deadlineDate: isoDaysFromNow(3),
    description:
      "The recommendation request form opens Friday, but Prof. Sharma prioritizes students he already knows. Seniors say two short office-hour visits before submitting the form materially improve response time.",
    whatMostPeopleMiss:
      "The hidden filter is familiarity, not CGPA. Bring one project update and one question each visit.",
    verificationCount: 12,
    verifiedBy: [
      { name: "Ananya Rao", year: "4th Year", branch: "CSE" },
      { name: "Rahul Menon", year: "4th Year", branch: "CSE" },
      { name: "Mithila K", year: "Alumni", branch: "CSE" },
    ],
    credibilityScore: 87,
    postedBy: "Verified Senior",
    status: "approved",
  },
  {
    id: "tip-2",
    title: "Goldman referral sheet closes 48 hours before the public internship deadline",
    category: "Recruiting",
    college: "BITS Pilani",
    branch: "ECE",
    urgency: "Critical",
    deadlineDate: isoDaysFromNow(2),
    description:
      "The student referral sheet circulated by the placement coordinators usually closes two days before the careers portal does. If you wait for the official last date, your name will miss the internal shortlist.",
    whatMostPeopleMiss:
      "Submit your resume in PDF under 1 MB or it gets dropped from the coordinators' batch upload.",
    verificationCount: 19,
    verifiedBy: [
      { name: "Suhail P", year: "4th Year", branch: "ECE" },
      { name: "Tanvi Goyal", year: "4th Year", branch: "EEE" },
    ],
    credibilityScore: 93,
    postedBy: "Verified Senior",
    status: "approved",
  },
  {
    id: "tip-3",
    title: "Department travel grants reimburse sleeper rail, not flight upgrades",
    category: "Scholarship",
    college: "Delhi University",
    branch: "Economics",
    urgency: "Soon",
    deadlineDate: isoDaysFromNow(8),
    description:
      "Students presenting papers can claim the departmental travel grant, but finance clears only sleeper rail or basic bus fare unless the HoD has signed a pre-approval note.",
    whatMostPeopleMiss:
      "You need original tickets and the seminar acceptance letter stapled together before submission.",
    verificationCount: 7,
    verifiedBy: [{ name: "Ishita S", year: "3rd Year", branch: "Economics" }],
    credibilityScore: 78,
    postedBy: "Verified Senior",
    status: "approved",
  },
  {
    id: "tip-4",
    title: "Robotics club core team quietly recruits after the midnight build sprint",
    category: "Club",
    college: "IIT Kharagpur",
    branch: "Mechanical",
    urgency: "FYI",
    deadlineDate: isoDaysFromNow(15),
    description:
      "Officially the club says all members are welcome, but core team selections are usually discussed after the inter-hostel midnight build sprint. Freshers who stay through teardown get remembered.",
    whatMostPeopleMiss:
      "Bring your own safety gloves. Borrowed gear signals you were not prepared for workshop work.",
    verificationCount: 9,
    verifiedBy: [{ name: "Arpan D", year: "4th Year", branch: "Mechanical" }],
    credibilityScore: 74,
    postedBy: "Verified Senior",
    status: "approved",
  },
  {
    id: "tip-5",
    title: "Civil lab attendance under 85% blocks TA signatures for viva slots",
    category: "Department Norm",
    college: "VJTI Mumbai",
    branch: "Civil",
    urgency: "Soon",
    deadlineDate: isoDaysFromNow(6),
    description:
      "Students below 85% attendance are being asked to get TA clearance before the viva slot sheet is signed. The rule is not written on the notice board but is being enforced this term.",
    whatMostPeopleMiss:
      "The TA will usually approve if you carry both your attendance register photo and medical proof in the same visit.",
    verificationCount: 5,
    verifiedBy: [{ name: "Shreya T", year: "3rd Year", branch: "Civil" }],
    credibilityScore: 80,
    postedBy: "Verified Senior",
    status: "approved",
  },
  {
    id: "tip-6",
    title: "MCM scholarship backlog forms need bank passbook photocopies, not statements",
    category: "Scholarship",
    college: "Jadavpur University",
    branch: "Electrical",
    urgency: "Critical",
    deadlineDate: isoDaysFromNow(4),
    description:
      "The scholarship office has started rejecting online statements for backlog disbursal files. They now want the first-page passbook photocopy with IFSC visible.",
    whatMostPeopleMiss:
      "Attach both sides of your ID card. The back side with enrollment year is getting checked manually.",
    verificationCount: 14,
    verifiedBy: [{ name: "Debojit L", year: "4th Year", branch: "Electrical" }],
    credibilityScore: 91,
    postedBy: "Verified Senior",
    status: "approved",
  },
  {
    id: "tip-7",
    title: "TCS digital shortlist is favoring students who finish the mock OA before Sunday",
    category: "Recruiting",
    college: "NIT Warangal",
    branch: "IT",
    urgency: "Soon",
    deadlineDate: isoDaysFromNow(5),
    description:
      "Placement volunteers reported that students who complete the mock assessment by Sunday are being marked as 'ready' in the coordinator sheet sent to recruiters.",
    whatMostPeopleMiss:
      "The OA link is in the placement Telegram pinned message, not the official portal.",
    verificationCount: 0,
    verifiedBy: [],
    credibilityScore: 65,
    postedBy: "Verified Senior",
    status: "pending",
  },
  {
    id: "tip-8",
    title: "Chemistry faculty seminar seats fill through the first front-row signup sheet",
    category: "Faculty",
    college: "IISER Pune",
    branch: "Chemistry",
    urgency: "FYI",
    deadlineDate: isoDaysFromNow(11),
    description:
      "Seminar participation looks open, but the faculty coordinator uses the front-row signup sheet to pick discussion leads and recommendation candidates.",
    whatMostPeopleMiss:
      "Write your lab section on the sheet or you may be skipped during final allocation.",
    verificationCount: 0,
    verifiedBy: [],
    credibilityScore: 69,
    postedBy: "Verified Senior",
    status: "pending",
  },
];

export const mockCalendar = [
  {
    id: "cal-1",
    title: "MCM scholarship document freeze",
    college: "Jadavpur University",
    branch: "All",
    deadlineDate: isoDaysFromNow(4),
  },
  {
    id: "cal-2",
    title: "Civil viva slot approvals",
    college: "VJTI Mumbai",
    branch: "Civil",
    deadlineDate: isoDaysFromNow(6),
  },
  {
    id: "cal-3",
    title: "Department travel grant filing",
    college: "Delhi University",
    branch: "Economics",
    deadlineDate: isoDaysFromNow(8),
  },
  {
    id: "cal-4",
    title: "Robotics midnight build sprint",
    college: "IIT Kharagpur",
    branch: "Mechanical",
    deadlineDate: isoDaysFromNow(15),
  },
];
