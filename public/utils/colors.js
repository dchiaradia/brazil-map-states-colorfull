var colors = { 
    randomColor: function randomColor() { 
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    white: '#ffffff',
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
    yellow: '#ffff00',
    orange: '#ffa500',
    purple: '#800080',
    pink: '#ffc0cb',
    brown: '#a52a2a',
    black: '#000000',
    gray: '#808080',
    silver: '#c0c0c0',
    gold: '#ffd700',
    bronze: '#cd7f32',
    teal: '#008080',
    navy: '#000080',
    danger: '#dc3545',
    warning: '#ffc107',
    success: '#28a745',
};

export { colors };
