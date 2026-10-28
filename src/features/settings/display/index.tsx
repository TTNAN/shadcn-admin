import { ContentSection } from '../components/content-section'
import { DisplayForm } from './display-form'

export function SettingsDisplay() {
  return (
    <ContentSection
      title='显示'
      desc="开关各项内容，控制应用中显示的内容。"
    >
      <DisplayForm />
    </ContentSection>
  )
}
