import { Link, useLocation } from "react-router-dom";
import { trackPortalButtonClick } from "../utils/portalTracking";

function extractLabel(children) {
  if (typeof children === "string") {
    return children.trim() || undefined;
  }
  if (Array.isArray(children)) {
    const joined = children.filter((item) => typeof item === "string").join(" ").trim();
    return joined || undefined;
  }
  return undefined;
}

export default function PortalTrackedLink({
  trackingCode,
  trackingLabel,
  trackingCategory,
  trackingPayload,
  onClick,
  children,
  to,
  ...rest
}) {
  const location = useLocation();
  const targetPath = typeof to === "string" ? to : to?.pathname ?? null;

  function handleClick(event) {
    trackPortalButtonClick({
      buttonCode: trackingCode || targetPath || trackingLabel || extractLabel(children) || "unknown",
      buttonLabel: trackingLabel || extractLabel(children),
      categoria: trackingCategory || null,
      sourcePath: location.pathname,
      targetPath,
      payload: trackingPayload,
    });

    if (onClick) {
      onClick(event);
    }
  }

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
