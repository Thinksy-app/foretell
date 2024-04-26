import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconBat,
  IconDeviceTv,
  IconReportMoney,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Actuals",
    icon: IconReportMoney,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Projects",
  },
  {
    id: uniqueId(),
    title: "Gotham Knights",
    icon: IconBat,
    href: "/project-gotham",
  },
  {
    id: uniqueId(),
    title: "The Cosmic Shake ",
    icon: IconDeviceTv,
    href: "/icons",
  },  
  // {
  //   id: uniqueId(),
  //   title: "Shadow",
  //   icon: IconCopy,
  //   href: "/utilities/shadow",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
];

export default Menuitems;
