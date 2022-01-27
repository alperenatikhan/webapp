
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoInput } from '@components/IDO/IdoInput/IdoInput'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'

storiesOf('IDO/IdoInput', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: "#111931", padding: '10px' }}>
      <IdoInput name="Ido Input" color='secondary' balance ={5000} conversionRate = {15.5} valueChange={2.41} onHover={action('hover')} />
    </div>
  ))
  .add('hover', () => (
    <div style={{ backgroundColor: "#111931", padding: '10px' }}>
      <IdoInput name='Ido Input' color='secondary' />
    </div>
  ))
  
