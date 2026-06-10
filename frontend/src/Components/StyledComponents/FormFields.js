import {styled, TextField} from '@mui/material';


export const InputText = styled(TextField)(({sx,theme})=>({
    color:theme.colorScheme.palette.light.primary.contrastText,
    borderRadius:'3px',
    ...sx
}))


