const notesData = [
    {
        type: 'natural',
        notes: [
            {
                label: 'C',
                value: 0,
                staffVal: 0
            },
            {
                label: 'D',
                value: 2,
                staffVal: 1
            },
            {
                label: 'E',
                value: 4,
                staffVal: 2
            },
            {
                label: 'F',
                value: 5,
                staffVal: 3
            },
            {
                label: 'G',
                value: 7,
                staffVal: 4
            },
            {
                label: 'A',
                value: 9,
                staffVal: 5
            },
            {
                label: 'B',
                value: 11,
                staffVal: 6
            },
        ]
    },
    {
        type: 'sharp',
        notes: [
            {
                label: 'C♯',
                value: 1,
                staffVal: 0
            },
            {
                label: 'D♯',
                value: 3,
                staffVal: 1
            },
            {
                label: 'E♯',
                value: 5,
                staffVal: 2
            },
            {
                label: 'F♯',
                value: 6,
                staffVal: 3
            },
            {
                label: 'G♯',
                value: 8,
                staffVal: 4
            },
            {
                label: 'A♯',
                value: 10,
                staffVal: 5
            },
            {
                label: 'B♯',
                value: 12,
                staffVal: 6
            },
        ]
    },
    {
        type: 'flat',
        notes: [
            {
                label: 'C♭',
                value: 11,
                staffVal: 7
            },
            {
                label: 'D♭',
                value: 1,
                staffVal: 1
            },
            {
                label: 'E♭',
                value: 3,
                staffVal: 2
            },
            {
                label: 'F♭',
                value: 4,
                staffVal: 3
            },
            {
                label: 'G♭',
                value: 6,
                staffVal: 4
            },
            {
                label: 'A♭',
                value: 8,
                staffVal: 5
            },
            {
                label: 'B♭',
                value: 10,
                staffVal: 6
            },
        ]
    },
    {
        type: 'doubleSharp',
        notes: [
            {
                label: 'C𝄪',
                value: 2,
                staffVal: 0
            },
            {
                label: 'D𝄪',
                value: 4,
                staffVal: 1
            },
            {
                label: 'F𝄪',
                value: 7,
                staffVal: 3
            },
            {
                label: 'G𝄪',
                value: 9,
                staffVal: 4
            },
            {
                label: 'A𝄪',
                value: 11,
                staffVal: 5
            }
        ]
    },
    {
        type: 'doubleFlat',
        notes: [
            {
                label: 'D𝄫',
                value: 0,
                staffVal: 1
            },
            {
                label: 'E𝄫',
                value: 2,
                staffVal: 2
            },
            {
                label: 'G𝄫',
                value: 5,
                staffVal: 4
            },
            {
                label: 'A𝄫',
                value: 7,
                staffVal: 5
            },
            {
                label: 'B𝄫',
                value: 9,
                staffVal: 6
            }
        ]
    },
];

const chordsData = [
    {
        label: 'Major',
        id: 0,
        suffix: '',
        intervals: [4, 3, 5],
        staffIntervals: [2, 2, 3],
        altered: false,
    },
    {
        label: 'Minor',
        id: 1,
        suffix: 'm',
        intervals: [3, 4, 5],
        staffIntervals: [2, 2, 3],
        altered: false
    },
    {
        label: 'Diminished',
        id: 2,
        suffix: 'dim',
        intervals: [3, 3, 6],
        altered: true,
        alteredObjId: 1,
        alterations: [{ idx: 1, val: -1 }, { idx: 2, val: 1 }]
    },
    {
        label: 'Augmented',
        id: 3,
        suffix: 'aug',
        intervals: [4, 4, 4],
        altered: true,
        alteredObjId: 0,
        alterations: [{ idx: 1, val: 1 }, { idx: 2, val: -1 }]
    }
];

const scalesData = [
    {
        label: 'Major',
        id: 0,
        intervals: [2, 2, 1, 2, 2, 2, 1],
        staffIntervals: [1, 1, 1, 1, 1, 1, 1],
        altered: false
    },
    {
        label: 'Dorian',
        id: 1,
        intervals: [2, 1, 2, 2, 2, 1, 2],
        staffIntervals: [1, 1, 1, 1, 1, 1, 1],
        altered: false
    },
    {
        label: 'Phrygian',
        id: 2,
        intervals: [1, 2, 2, 2, 1, 2, 2],
        staffIntervals: [1, 1, 1, 1, 1, 1, 1],
        altered: false
    },
    {
        label: 'Lydian',
        id: 3,
        intervals: [2, 2, 2, 1, 2, 2, 1],
        staffIntervals: [1, 1, 1, 1, 1, 1, 1],
        altered: false
    },
    {
        label: 'Mixolydian',
        id: 4,
        intervals: [2, 2, 1, 2, 2, 1, 2],
        staffIntervals: [1, 1, 1, 1, 1, 1, 1],
        altered: false
    },
    {
        label: 'Minor',
        id: 5,
        intervals: [2, 1, 2, 2, 1, 2, 2],
        staffIntervals: [1, 1, 1, 1, 1, 1, 1],
        altered: false
    },
    {
        label: 'Locrian',
        id: 6,
        intervals: [1, 2, 2, 1, 2, 2, 2],
        staffIntervals: [1, 1, 1, 1, 1, 1, 1],
        altered: false
    },
    {
        label: 'Harmonic',
        id: 7,
        intervals: [2, 1, 2, 2, 1, 3, 1],
        altered: true,
        alteredObjId: 5,
        alterations: [{ idx: 5, val: 1 }, { idx: 6, val: -1 }]
    },
    {
        label: 'Double Harmonic',
        id: 8,
        intervals: [1, 3, 1, 2, 1, 3, 1],
        altered: true,
        alteredObjId: 0,
        alterations: [{ idx: 0, val: -1 }, { idx: 1, val: 1 }, { idx: 4, val: -1 }, { idx: 5, val: 1 }]
    },
    {
        label: 'Melodic',
        id: 9,
        intervals: [2, 1, 2, 2, 2, 2, 1],
        altered: true,
        alteredObjId: 5,
        alterations: [{ idx: 4, val: 1 }, { idx: 6, val: -1 }]
    },
    {
        label: 'Enigmatic',
        id: 10,
        intervals: [1, 3, 2, 2, 2, 1, 1],
        altered: true,
        alteredObjId: 0,
        alterations: [{ idx: 0, val: -1 }, { idx: 1, val: 1 }, { idx: 2, val: 1 }, { idx: 5, val: -1 }]
    },
    {
        label: 'Acoustic',
        id: 12,
        intervals: [2, 2, 2, 1, 2, 1, 2],
        altered: true,
        alteredObjId: 0,
        alterations: [{ idx: 2, val: 1 }, { idx: 3, val: -1 },{ idx: 5, val: -1 }, { idx: 6, val: 1 }]
    },
    {
        label: 'Altered',
        id: 14,
        intervals: [1, 2, 1, 2, 2, 2, 2],
        altered: true,
        alteredObjId: 0,
        alterations: [{ idx: 0, val: -1 }, { idx: 6, val: 1 }]

    }/*,
    {
        label: 'Algerian',
        id: 13,
        intervals: [2, 1, 3, 1, 1, 3, 1, 2, 1, 2]
    },
    {
        label: 'Augmented',
        id: 15,
        intervals: [3, 1, 3, 1, 3, 1]
    },
    {
        label: 'Bebop Dominent',
        id: 16,
        intervals: [2, 2, 1, 2, 2, 1, 1, 1]
    }
    */
];

export default { notesData, chordsData, scalesData };