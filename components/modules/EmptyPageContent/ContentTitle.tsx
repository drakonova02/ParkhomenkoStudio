import { IContentTitleProps } from '@/types/modules'

const ContentTitle = ({ title, oopsWord }: IContentTitleProps) => (
  <h1>{oopsWord} {title}</h1>
)

export default ContentTitle