import mixpanel from "mixpanel-browser";

mixpanel.init("a4da85f8451c539ea25b22ec100d2552", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

export default mixpanel;
