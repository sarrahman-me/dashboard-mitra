import mixpanel from "mixpanel-browser";

mixpanel.init("6690a0f4e18fde250a37d560c74c031e", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

export default mixpanel;
