import { styled, Button } from "@mui/material"

// style Buttons
export const PrimaryButton = styled(Button)(({sx ,theme })=>({
    backgroundColor:theme.colorScheme.palette.dark.primary.main,
    color:theme.colorScheme.palette.dark.primary.contrastText,
    borderRadius:'3px',
    width:'200px',
    height:'35px',
    ...sx
}))

export const SecondaryButton = styled(PrimaryButton)(({sx ,theme })=>({
    backgroundColor:theme.colorScheme.palette.light.secondary.main,
    color:theme.colorScheme.palette.light.secondary.contrastText,
    ...sx
}))


