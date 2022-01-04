const configuredApplicationsParser = (applicationsObj) => {
  const parsedApplications = Object.keys(applicationsObj)
    .filter(s => applicationsObj[s].enabled)
    .map(s => ({
      id: s,
      info: {
        priority: applicationsObj[s].priority,
        label: applicationsObj[s].label,
        icon: applicationsObj[s].icon,
      },
      url: applicationsObj[s].url
    }))
  return parsedApplications
}

export default configuredApplicationsParser