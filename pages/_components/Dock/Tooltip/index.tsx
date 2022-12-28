import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@material-ui/core";

// type TooltipBaseProps = MuiTooltipProps

// Only include variant, size, color from MuiTooltipProps
// type TooltipBaseProps = Pick<MuiTooltipProps, "keyOfThat" | "anotherKey">;

// Include everything from MuiTooltipProps except disableRipple
type TooltipBaseProps = Omit<MuiTooltipProps, "title">;

export interface TooltipProps extends TooltipBaseProps {
  enable?: boolean;
  title: string;
}

export const Tooltip = ({ enable = true, children, ...rest }: TooltipProps) => {
  return (
    <>
      {enable ? (
        <MuiTooltip
          placement="top"
          enterDelay={75}
          enterNextDelay={100}
          {...rest}
        >
          {children}
        </MuiTooltip>
      ) : (
        { children }
      )}
    </>
  );
};

Tooltip.defaultProps = {
  enable: true,
  title: "",
};
