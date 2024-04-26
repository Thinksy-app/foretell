import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconBat,
  IconDeviceTv,
  IconReportMoney,
  IconBrandSpeedtest,
  IconFileReport,
  IconChartInfographic,
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
    title: "Company P&L",
    icon: IconBrandSpeedtest,
    href: "/profit-and-loss",
  },
  {
    id: uniqueId(),
    title: "Report Views",
    icon: IconFileReport,
    href: "/profit-and-loss",
  },  
  {
    id: uniqueId(),
    title: "Forecasts",
    icon: IconChartInfographic,
    href: "/Forecasts",
  },  
  {
    id: uniqueId(),
    title: "Templates",
    icon: IconLayoutDashboard,
    href: "/templates",
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
    href: "/the-cosmic-shake",
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
