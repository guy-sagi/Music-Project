export const cofCnsts = {
    COF_SIDE_LENGTH: 400,
    DEFAULT_COLOR: "pink",
    HOVER_COLOR: "salmon",
    CLICKED_COLOR: "violet",
    HOVER_CLICKED_COLOR: "darkviolet",
    CENTER: { x: 0, y: 0 },
    R1: 0,
    R2: 0,
    R3: 0,
    initialize: function () {
        this.CENTER.x = this.COF_SIDE_LENGTH / 2;
        this.CENTER.y = this.COF_SIDE_LENGTH / 2;
        this.R1 = 3 * this.COF_SIDE_LENGTH / 8;
        this.R2 = this.COF_SIDE_LENGTH / 4;
        this.R3 = 11 * this.COF_SIDE_LENGTH / 80;
    }
};

export const pianoCnsts = {
    TITLE: "",/*"My piano",*/
    PIANO_WIDTH: 400,
    PIANO_HEIGHT: 400/3,
    DEFAULT_WHITEKEY_COLOR: "white",
    DEFAULT_BLACKKEY_COLOR: "black",
    HOVER_WHITEKEY_COLOR: "pink",
    HOVER_BLACKKEY_COLOR: "pink",
    CLICKED_WHITEKEY_COLOR: "salmon",
    CLICKED_BLACKKEY_COLOR: "salmon",
    TIME_INTERVAL: 750
};

export const staffCnsts = {
    STAFF_SIZE: { width: 800, height: 0 },
    STAFF_LENGTH: 0,
    BAR_WIDTH: 0,
    STAFF_GAP_SIZE: { width: 0, height: 0 },
    C4_POS: 0,
    B4_POS: 0,
    G_CLEF_IMG_PROPS: { src: "./images/g-clef.png", x: 0, y: 0, width: 0, height: 0 },
    FOUR_FOURTHS_IMG_PROPS: { src: "./images/four-fourths.png", x: 0, y: 0, width: 0, height: 0 },
    NATURAL_IMG_PROPS: { src: "./images/natural.png", width: 0, height: 0, c4Pos: 0 },
    SHARP_IMG_PROPS: { src: "./images/sharp.png", x: 0, y: 0, width: 0, height: 0, c4Pos: 0, gaps: { x: 0, y: [] } },
    FLAT_IMG_PROPS: { src: "./images/flat.png", x: 0, y: 0, width: 0, height: 0, c4Pos: 0, gaps: { x: 0, y: [] } },
    DOUBLE_SHARP_IMG_PROPS: { src: "./images/double-sharp.png", width: 0, height: 0, c4Pos: 0 },
    DOUBLE_FLAT_IMG_PROPS: { src: "./images/double-flat.png", width: 0, height: 0, c4Pos: 0 },
    QUARTER_UP_IMG_PROPS: { src: "./images/quarter-up.png", x: 0, y: 0, width: 0, height: 0 },
    QUARTER_DOWN_IMG_PROPS: { src: "./images/quarter-down.png", x: 0, y: 0, width: 0, height: 0 },
    initialize: function () {
        /*Staff props initialize*/
        const SW = this.STAFF_SIZE.width;
        this.STAFF_SIZE.height = SW/6;
        const SH = this.STAFF_SIZE.height;
        this.STAFF_LENGTH = 79*SW/80;
        this.BAR_WIDTH = this.STAFF_LENGTH/2;
        this.STAFF_GAP_SIZE.width = SW/15;
        this.STAFF_GAP_SIZE.height = SH/10;
        this.C4_POS = SH/2;
        this.B4_POS = SH/2 - 6*this.STAFF_GAP_SIZE.height/2;
        /*G Clef Img initialize */
        this.G_CLEF_IMG_PROPS.x = SW/40;
        this.G_CLEF_IMG_PROPS.y = SH/7;
        this.G_CLEF_IMG_PROPS.width = SW/20;
        this.G_CLEF_IMG_PROPS.height = 13*SH/18;
        /*Four Fourths Img initialize */
        this.FOUR_FOURTHS_IMG_PROPS.x = SW/12.5;
        this.FOUR_FOURTHS_IMG_PROPS.y = SH/3.4;
        this.FOUR_FOURTHS_IMG_PROPS.width = SW/35;
        this.FOUR_FOURTHS_IMG_PROPS.height = 13*SH/32;
        /*Natural Img initialize */
        this.NATURAL_IMG_PROPS.width = SW/100;
        this.NATURAL_IMG_PROPS.height = SH/5;
        this.NATURAL_IMG_PROPS.c4Pos = SH/1.42;
        /*Sharp Img initialize */
        this.SHARP_IMG_PROPS.x = SW/11.25;
        this.SHARP_IMG_PROPS.y = SH/15;
        this.SHARP_IMG_PROPS.width = SW/45;
        this.SHARP_IMG_PROPS.height = SH/6;
        this.SHARP_IMG_PROPS.c4Pos = SH/1.4;
        this.SHARP_IMG_PROPS.gaps.x = SW/50;
        this.SHARP_IMG_PROPS.gaps.y = [SH/4.6, SH/7, -SH/5, SH/6.4, SH/7.1, -SH/5.1, SH/6.5];
        /*Flat Img initialize */
        this.FLAT_IMG_PROPS.x = SW/11.25;
        this.FLAT_IMG_PROPS.y = SH/15;
        this.FLAT_IMG_PROPS.width = SW/70;
        this.FLAT_IMG_PROPS.height = 11*SH/50;
        this.FLAT_IMG_PROPS.c4Pos = SH/1.55;
        this.FLAT_IMG_PROPS.gaps.x = SW/50;
        this.FLAT_IMG_PROPS.gaps.y = [ SH/2.9, -SH/6.4, SH/5, -SH/6.9, SH/5, -SH/6.4, SH/5];
        /*Double Sharp Img initialize */
        this.DOUBLE_SHARP_IMG_PROPS.width = SW/55;
        this.DOUBLE_SHARP_IMG_PROPS.height = SH/9;
        this.DOUBLE_SHARP_IMG_PROPS.c4Pos = SH/1.35;
        /*Double Flat Img initialize */
        this.DOUBLE_FLAT_IMG_PROPS.width = SW/40;
        this.DOUBLE_FLAT_IMG_PROPS.height = 11*SH/50;
        this.DOUBLE_FLAT_IMG_PROPS.c4Pos = SH/1.55;
        /*Quarter-Up Img initialize */
        this.QUARTER_UP_IMG_PROPS.y = this.C4_POS;
        this.QUARTER_UP_IMG_PROPS.width = SW/45;
        this.QUARTER_UP_IMG_PROPS.height = 0.35*SH;
        /*Quarter-Up Img initialize */
        this.QUARTER_DOWN_IMG_PROPS.y = this.B4_POS;
        this.QUARTER_DOWN_IMG_PROPS.width = SW/45;
        this.QUARTER_DOWN_IMG_PROPS.height = 0.35*SH;
    }
};

export default {
    cofCnsts,
    pianoCnsts,
    staffCnsts
}