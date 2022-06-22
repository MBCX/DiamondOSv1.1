const notyf = new Notyf({
    duration: 7000,
    position: {
      x: 'right',
      y: 'top'
    },
    ripple: false,
    dismissible: true,
    types: [
        {
            type: 'warning',
            background: '#FE5A00',
            icon: {
            className: 'material-icons',
            tagName: 'SPAN',
            text: 'warning',
            color: '#FFFFFF'
            }
        },
        {
            type: 'battery-alert',
            background: '#FE2857',
            icon: {
            className: 'material-icons',
            tagName: 'SPAN',
            text: 'battery_alert',
            color: '#FFFFFF'
            }
        },
        {
            type: 'info',
            background: '#909090',
            icon: {
            className: 'material-icons',
            tagName: 'SPAN',
            text: 'info',
            color: '#424242'
            }
        },
        {
            type: 'wifi-connected',
            background: '#34A853',
            icon: {
            className: 'material-icons',
            tagName: 'SPAN',
            text: 'wifi',
            color: '#FFFFFF'
            }
        },
        {
            type: 'wifi-out',
            background: '#EA4335',
            icon: {
            className: 'material-icons',
            tagName: 'SPAN',
            text: 'wifi_off',
            color: '#FFFFFF'
            }
        }
    ]
});
  