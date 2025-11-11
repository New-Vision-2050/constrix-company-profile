import { DialogTitle, DialogTitleProps, IconButton } from "@mui/material";
import { CloseCircle } from "iconsax-reactjs";

export type BaseDialogTitleProps = Omit<DialogTitleProps, "children"> & {
  title: React.ReactNode;
  onClose?: () => void;
};

function BaseDialogTitle({ title, onClose, ...props }: BaseDialogTitleProps) {
  return (
    <DialogTitle
      {...props}
      sx={{
        pe: 6,
        position: "relative",
        display: "flex",
        alignItems: "start",
        ...props.sx,
      }}
    >
      {title}
      {onClose && (
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseCircle size={28} />
        </IconButton>
      )}
    </DialogTitle>
  );
}

export default BaseDialogTitle;
