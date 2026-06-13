import { styled, Button } from "@mui/material"

// style Buttons
export const PrimaryButton = styled(Button)(({theme })=>({
    backgroundColor:theme.colorScheme.palette.dark.primary.main,
    color:theme.colorScheme.palette.dark.primary.contrastText,
    borderRadius:'20px',
    width:'150px',
    padding:'10px',
    height:'40px'
}))

export const SecondaryButton = styled(PrimaryButton)(({sx ,theme })=>({
    backgroundColor:theme.colorScheme.palette.light.secondary.main,
    color:theme.colorScheme.palette.light.secondary.contrastText,
    ...sx
}))
