
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabel } from '@components/IDO/IdoLabel/IdoLabel'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import invariantLogo from "/src/static/png/invariant-logo.png"

storiesOf('IDO/IdoLabel4', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>

<IdoLabel name="Estimated token price" amount= "218.839" isDarkBg={true} />


        
    </div>
  ))
  .add('hover', () => (
    <div >

<IdoLabel name="Estimated token price" amount= "218.839" />


    </div>
  ))
  
