import React, { useEffect } from "react";

const Notification = React.memo(function Notification({ notif, onClose }) {
  useEffect(() => {
    if (!notif) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [notif, onClose]);

  if (!notif) return null;

  return (
    <div className={`notif notif-${notif.type}`} onClick={onClose}>
      {notif.msg}
    </div>
  );
});

export default Notification;
