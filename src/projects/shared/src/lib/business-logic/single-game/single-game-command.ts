export const Commands = {
    go: {
        story: [],
        attributes: [],
        skills: [],
        inventory: [],
        enemies: []
    },
    story: {
        list: {
            options: []
        },
        select: {
            option: ["{option number}"]
        }
    },
    attributes: {
        list: [],
        show: ["{attribute name}"],
        improve: ["{attribute name}"],
    },
    inventory: {
        list: {
            bodyParts: [],
            allItem: [],
            bag: [],
            weared: []
        },
        putOn: ["{item name}", "{body part}"],
        putOff: ["{item name}", "{body part}"],
        drop: ["{item name}"],
        use: ["{item name}"]
    },
    enemies: {
        list: {
            all: [],
            enemies: [],
            mates: []
        }
    }
}