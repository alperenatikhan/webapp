import { getScaleFromString } from '@consts/utils'
import { Button, Grid, Input, Typography } from '@material-ui/core'
import React, { useRef, CSSProperties } from 'react'
import useStyles from './style'

interface IProps {
  setValue: (value: string) => void
  currency: string | null
  currencyIconSrc?: string
  value?: string
  placeholder?: string
  onMaxClick: () => void
  style?: CSSProperties
  blocked?: boolean
  blockerInfo?: string
  decimalsLimit: number
  onBlur?: () => void
}

export const DepositAmountInput: React.FC<IProps> = ({
  currency,
  currencyIconSrc,
  value,
  setValue,
  placeholder,
  onMaxClick,
  style,
  blocked = false,
  blockerInfo,
  onBlur,
  decimalsLimit
}) => {
  const classes = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)

  const allowOnlyDigitsAndTrimUnnecessaryZeros: React.ChangeEventHandler<HTMLInputElement> = e => {
    const regex = /^\d*\.?\d*$/
    if (e.target.value === '' || regex.test(e.target.value)) {
      const startValue = e.target.value
      const caretPosition = e.target.selectionStart

      let parsed = e.target.value
      const zerosRegex = /^0+\d+\.?\d*$/
      if (zerosRegex.test(parsed)) {
        parsed = parsed.replace(/^0+/, '')
      }

      const dotRegex = /^\.\d*$/
      if (dotRegex.test(parsed)) {
        parsed = `0${parsed}`
      }

      if (getScaleFromString(parsed) > decimalsLimit) {
        const parts = parsed.split('.')

        parsed = parts[0] + '.' + parts[1].slice(0, decimalsLimit)
      }

      const diff = startValue.length - parsed.length

      setValue(parsed)
      if (caretPosition !== null && parsed !== startValue) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = Math.max(caretPosition - diff, 0)
            inputRef.current.selectionEnd = Math.max(caretPosition - diff, 0)
          }
        }, 0)
      }
    } else if (!regex.test(e.target.value)) {
      setValue('')
    }
  }

  return (
    <Grid container className={classes.wrapper} style={style}>
      <Input
        inputRef={inputRef}
        className={classes.root}
        type={'text'}
        value={value}
        disableUnderline={true}
        placeholder={placeholder}
        onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
        startAdornment={
          <Grid
            className={classes.currency}
            container
            justifyContent='center'
            alignItems='center'
            wrap='nowrap'>
            {currency !== null ? (
              <>
                <img alt='' src={currencyIconSrc} className={classes.currencyIcon} />
                <Typography className={classes.currencySymbol}>{currency}</Typography>
              </>
            ) : (
              <Typography className={classes.noCurrencyText}>Select</Typography>
            )}
          </Grid>
        }
        endAdornment={
          <Button className={classes.maxButton} onClick={onMaxClick}>
            Max
          </Button>
        }
        onBlur={onBlur}
      />

      {blocked && (
        <>
          <Grid container className={classes.blocker} />
          <Grid
            container
            className={classes.blockedInfoWrapper}
            justifyContent='center'
            alignItems='center'>
            <Typography className={classes.blockedInfo}>{blockerInfo}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  )
}
export default DepositAmountInput
