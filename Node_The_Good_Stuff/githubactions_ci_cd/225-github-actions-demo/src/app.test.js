const { dayOfTheWeek } = require('./app');


test('getDay returns the long-format day of the week', () => {
    const day = dayOfTheWeek( new Date('14/09/2021') );
    expect( day ).toBe('Wednesday');
});