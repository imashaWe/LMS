import {useSnackbar} from "material-ui-snackbar-provider";

export const useMessage = () => {
    const snackbar = useSnackbar();

    return {
        error: (message) => {

        }, errorNotify: (message) => {
            snackbar.showMessage(message);
        }, successNotify: (message) => {
            snackbar.showMessage(message);
        }
    }
}