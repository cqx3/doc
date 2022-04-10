type SocialLinkIcon =
  | 'discord'
  | 'facebook'
  | 'github'
  | 'linkedin'
  | 'slack'
  | 'twitter'
  | 'languages'

export interface SocialLink {
  icon: SocialLinkIcon
  link: string
}
