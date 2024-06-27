import { createTheme, Theme } from '@mui/material/styles';
import { darkPalette, LightPalette } from './palette';
import { typography } from './typography';

import { MuiToggleButton } from './CustomComponents/ToggleButton';
import { MuiButton } from './CustomComponents/MenuButton';
import { MuiCheckbox } from './CustomComponents/Checkbox';
import { MuiInputBase } from './CustomComponents/Input';
import { MuiOutlinedInput } from './CustomComponents/OutlinedInput';
import { MuiTabs } from './CustomComponents/Tabs';

const lightTheme = createTheme({
  palette: LightPalette,
  typography,
  components: {
    MuiButton,
    MuiToggleButton,
    MuiInputBase,
    MuiOutlinedInput,
    MuiTabs,
    MuiCheckbox,
  },
});

const darkTheme: Theme = createTheme({
  palette: darkPalette,
  typography,
  components: {
    MuiButton,
    MuiToggleButton,
    MuiInputBase,
    MuiOutlinedInput,
    MuiTabs,
    MuiCheckbox,
  },
});

export { lightTheme, darkTheme };
