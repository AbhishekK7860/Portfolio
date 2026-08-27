"use client";

import {
  GithubLogo,
  LinkedinLogo,
  MediumLogo,
  InstagramLogo,
  EnvelopeSimple,
  type Icon,
} from "@phosphor-icons/react";
import { site } from "@/lib/site";

export interface SocialItem {
  key: string;
  label: string;
  short: string;
  href: string;
  Icon: Icon;
}

/** Ordered social links with their icons, shared by the rail and mobile menu. */
export const socialItems: SocialItem[] = [
  { ...site.socials.github, Icon: GithubLogo },
  { ...site.socials.linkedin, Icon: LinkedinLogo },
  { ...site.socials.medium, Icon: MediumLogo },
  { ...site.socials.instagram, Icon: InstagramLogo },
  { ...site.socials.email, Icon: EnvelopeSimple },
];
