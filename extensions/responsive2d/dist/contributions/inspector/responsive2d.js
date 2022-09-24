'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.update = exports.methodList = exports.$ = exports.template = void 0;
//type Object<propList> = { propList: Record<keyof propList, any | null> };
exports.template = `
<style>
    .tab {
        margin-top: 5px;
        overflow: hidden;
        border: 1px solid #0C0C0C;
        background-color: #141414;
        padding: 2px;
    }

    .tab ui-button.active {
        background-color: #141414;
    }

    .tabcontent {
        display: none;
        padding: 6px 12px;
        border: 1px dashed #0C0C0C;
        border-top: none;
        background-color: #292929;
        color: white;
        height: 500px;
    }

    .scale-components {
        width: 100%;
        background-color: blue;
        margin-bottom: 10px;
    }

    .scale-input {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        gap: 10px;
        background-color: #292929;
    }

    .slider-label-narrow {
        width: 80px;
    }
    
    .slider-label-wide {
        width: 120px;
    }

    .cocos-slider {
        width: 100%;
    }

    .cocos-slider-2 {
        width: 60%;
    }

    .widget-wrapper{
        display: grid;
        background-color: #292929;
        width: 100%;
        height: 200px;
        margin: 0 auto;
        grid-template-rows: 1fr 3fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
            "empty topNode empty"
            "leftNode widget rightNode"
            "empty bottomNode empty";
        align-items: center;
        justify-items: center;
        align-content: center;
        column-gap: 10px;
        row-gap: 10px;
    }

    .empty-area{
        grid-area: "empty";
    }

    .top-node{
        grid-area: "topNode";
    }

    .left-node{
        grid-area: "leftNode";
    }

    .right-node{
        grid-area: "rightNode";
    }

    .bottom-node{
        grid-area: "bottomNode";
    }

    .ref-node {
        min-width: 60px;
        width: 2fr;
    }

    .space-input {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        gap: 10px;
        background-color: #292929;    
    }

    .widget {
        display: grid;
        background-color: #292929;
        width: 108px;
        height: 108px;
        margin: 0 auto;
        margin-bottom: 10px;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
            "rect rect rect"
            "rect rect rect"
            "rect rect rect";
        align-items: center;
        justify-items: center;
        grid-area: "widget";
    }

    .inner-widget {
        background-color: #303C4A;
        width: 32px;
        height: 34px;
        text-align: center;
        grid-area: "rect";
        justify-content: center;
    }

    .logo {
        float: right;
        margin-right: 5px;
        margin-top: 6px;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .disable {
        pointer-events: none;
        opacity: 0.4;
    }

    .disable-child {
        pointer-events: none;
        opacity: 0.4;
    }
</style>

<div class="tab">
    <ui-button id="PortraitButton"><ui-icon value="mobile"></ui-icon></ui-button>
    <ui-button id="LandscapeButton" style="margin-left: 2px;"><ui-icon style="transform: rotate(90deg);" value="mobile"></ui-icon></ui-button>
    <ui-button id="SettingsButton" style="margin-left: 2px;"><ui-icon value="setting"></ui-icon></ui-button>
    <ui-button id="change-editor-device" class="yellow" style="margin-left: 2px; float: right;"><ui-icon value="transform"></ui-icon></ui-button>
    <ui-button id="rotate-canvas" class="blue" style="margin-left: 2px; margin-right: 2px; float: right;"><ui-icon value="rotate"></ui-icon></ui-button>
   
    <ui-button id="rotate-canvas-portrait" class="blue" style="display: none;"><ui-icon value="rotate"></ui-icon></ui-button>
    <ui-button id="rotate-canvas-landscape" class="blue" style="display: none;"><ui-icon value="rotate"></ui-icon></ui-button>
</div>

<div id="Portrait" class="tabcontent">
    <ui-input id="portrait-alignment" style="display:none;" value="portrait-mid-center"></ui-input>
    <div class="scale-components">
        <div class="scale-input">
            <label class="slider-label-narrow">W Ratio</label>
            <ui-slider class="cocos-slider" id="portrait-width-ratio" step="0.01" value="0.25" min="0.01" max="5"></ui-slider>
        </div>
        <div class="scale-input">
            <label class="slider-label-narrow">H Ratio</label>
            <ui-slider class="cocos-slider" id="portrait-height-ratio" step="0.01" value="0.25" min="0.01" max="5"></ui-slider>
        </div>
        <ui-select id="portrait-min-max" value="1" style="float:right;">
            <option value="1">min</option>
            <option value="2">max</option>
            <option value="3">stretch</option>
        </ui-select>
    </div>
    <div class="widget-wrapper" id="portrait-widget">
        <div class="empty-area"></div>
        <div class="top-node">
            <ui-node droppable="cc.Node" id="portrait-top-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
        <div class="left-node">
            <ui-node droppable="cc.Node" id="portrait-left-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="widget">
            <ui-button class="inner-widget" id="portrait-top-left"></ui-button>
            <ui-button class="inner-widget" id="portrait-top-center"></ui-button>
            <ui-button class="inner-widget" id="portrait-top-right"></ui-button>

            <ui-button class="inner-widget" id="portrait-mid-left"></ui-button>
            <ui-button style="background-color: #F58D1E;" class="inner-widget" id="portrait-mid-center"></ui-button>
            <ui-button class="inner-widget" id="portrait-mid-right"></ui-button>

            <ui-button class="inner-widget" id="portrait-bottom-left"></ui-button>
            <ui-button class="inner-widget" id="portrait-bottom-center"></ui-button>
            <ui-button class="inner-widget" id="portrait-bottom-right"></ui-button>
        </div>
        <div class="right-node">
            <ui-node droppable="cc.Node" id="portrait-right-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
        <div class="bottom-node">
            <ui-node droppable="cc.Node" id="portrait-bottom-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
    </div>

    <ui-checkbox style="margin-right: 10px; margin-top: 20px;" value="false" id="portrait-follow-node">Follow Node</ui-checkbox>
    <ui-node style="margin-top: 20px;" droppable="cc.Node" id="portrait-followed-node-uuid"></ui-node>

    <div class="space-input" style="margin-top: 10px;">
        <label class="slider-label-narrow">Hor Space</label>
        <ui-slider class="cocos-slider-2" id="portrait-hor-space" step="0.5" value="0" min="-100" max="100"></ui-slider>
        <ui-select id="portrait-hor-space-type" value="1">
            <option value="1">%</option>
            <option value="2">px</option>
            <option value="3">self</option>
            <option value="4">left</option>
            <option value="5">right</option>
            <option value="6">top</option>
            <option value="7">bottom</option>
            <option value="8">follow</option>
        </ui-select>
    </div>
    <div class="space-input">
        <label class="slider-label-narrow">Ver Space</label>
        <ui-slider class="cocos-slider-2" id="portrait-ver-space" step="0.5" value="0" min="-100" max="100"></ui-slider>
        <ui-select id="portrait-ver-space-type" value="1">
            <option value="1">%</option>
            <option value="2">px</option>
            <option value="3">self</option>
            <option value="4">left</option>
            <option value="5">right</option>
            <option value="6">top</option>
            <option value="7">bottom</option>
            <option value="8">follow</option>
        </ui-select>
    </div>
    <ui-checkbox style="display: block; width: 70px;" value="false" id="enable-portrait-flip-x">Flip X</ui-checkbox>
    <ui-checkbox style="display: block; width: 70px;" value="false" id="enable-portrait-flip-y">Flip Y</ui-checkbox>
</div>

<div id="Landscape" class="tabcontent">
    <ui-input id="landscape-alignment" style="display:none;" value="landscape-mid-center"></ui-input>
    <ui-checkbox value="false" id="enable-landscape">Enable</ui-checkbox>
    <div id="disabled_content" class="disable">
    <div class="scale-components">
        <div class="scale-input">
            <label class="slider-label-narrow">W Ratio</label>
            <ui-slider class="cocos-slider" id="landscape-width-ratio" step="0.01" value="0.25" min="0.01" max="5"></ui-slider>
        </div>
        <div class="scale-input">
            <label class="slider-label-narrow">H Ratio</label>
            <ui-slider class="cocos-slider" id="landscape-height-ratio" step="0.01" value="0.25" min="0.01" max="5"></ui-slider>
        </div>
        <ui-select id="landscape-min-max" value="1" style="float: right">
            <option value="1">min</option>
            <option value="2">max</option>
            <option value="3">stretch</option>
        </ui-select>
    </div>
    <div class="widget-wrapper" id="landscape-widget">
        <div class="empty-area"></div>
        <div class="top-node">
            <ui-node droppable="cc.Node" id="landscape-top-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
        <div class="left-node">
            <ui-node droppable="cc.Node" id="landscape-left-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="widget">
            <ui-button class="inner-widget" id="landscape-top-left"></ui-button>
            <ui-button class="inner-widget" id="landscape-top-center"></ui-button>
            <ui-button class="inner-widget" id="landscape-top-right"></ui-button>

            <ui-button class="inner-widget" id="landscape-mid-left"></ui-button>
            <ui-button style="background-color: #F58D1E;" class="inner-widget" id="landscape-mid-center"></ui-button>
            <ui-button class="inner-widget" id="landscape-mid-right"></ui-button>

            <ui-button class="inner-widget" id="landscape-bottom-left"></ui-button>
            <ui-button class="inner-widget" id="landscape-bottom-center"></ui-button>
            <ui-button class="inner-widget" id="landscape-bottom-right"></ui-button>
        </div>
        <div class="right-node">
            <ui-node droppable="cc.Node" id="landscape-right-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
        <div class="bottom-node">
            <ui-node droppable="cc.Node" id="landscape-bottom-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
    </div>

    <ui-checkbox style="margin-right: 10px; margin-top: 20px;" value="false" id="landscape-follow-node">Follow Node</ui-checkbox>
    <ui-node style="margin-top: 20px;" droppable="cc.Node" id="landscape-followed-node-uuid"></ui-node>

    <div class="space-input" style="margin-top: 10px;">
        <label class="slider-label-narrow">Hor Space</label>
        <ui-slider class="cocos-slider-2" id="landscape-hor-space" step="0.5" value="0" min="-100" max="100"></ui-slider>
        <ui-select id="landscape-hor-space-type" value="1">
            <option value="1">%</option>
            <option value="2">px</option>
            <option value="3">self</option>
            <option value="4">left</option>
            <option value="5">right</option>
            <option value="6">top</option>
            <option value="7">bottom</option>
            <option value="8">follow</option>
        </ui-select>
    </div>
    <div class="space-input">
        <label class="slider-label-narrow">Ver Space</label>
        <ui-slider class="cocos-slider-2" id="landscape-ver-space" step="0.5" value="0" min="-100" max="100"></ui-slider>
        <ui-select id="landscape-ver-space-type" value="1">
            <option value="1">%</option>
            <option value="2">px</option>
            <option value="3">self</option>
            <option value="4">left</option>
            <option value="5">right</option>
            <option value="6">top</option>
            <option value="7">bottom</option>
            <option value="8">follow</option>
        </ui-select>
    </div>
    <ui-checkbox style="display: block; width: 70px;" value="false" id="enable-landscape-flip-x">Flip X</ui-checkbox>
    <ui-checkbox style="display: block; width: 70px;" value="false" id="enable-landscape-flip-y">Flip Y</ui-checkbox>
    <ui-button id="copy-paste-portrait-content" class="red" style="margin-right: 10px; float: right">Paste Portrait</ui-button>
    </div>
</div>

<div id="Settings" class="tabcontent">
    <div style="margin-bottom: 10px; margin-top: 10px; display: flex; align-content: center;">
        <label class="slider-label-wide" style="padding-right: 10px">Resize Frequency</label>
        <ui-select id="align-mode" value="1">
            <option value="1">ONCE</option>
            <option value="2">ALWAYS</option>
            <option value="3">ON_WINDOW_RESIZE</option>
        </ui-select>
    </div>
    <div style="margin-bottom: 10px">
        <ui-checkbox value="false" id="is-calculating-container-bounds">Calculate Content Size</ui-checkbox>
    </div>
    <div style="margin-bottom: 10px"><ui-checkbox value="false" id="is-positioning-from-anchor-point">Positioning from Anchor</ui-checkbox></div>
</div>
`;
/* <ui-button id="recalculate-content-size" class="blue" style="margin-left: 10px;">Recalculate</ui-button> */
exports.$ = {
    portraitButton: '#PortraitButton',
    landscapeButton: '#LandscapeButton',
    settingsButton: '#SettingsButton',
    portrait: '#Portrait',
    landscape: '#Landscape',
    settings: '#Settings',
    portraitWidget: '#portrait-widget',
    landscapeWidget: '#landscape-widget',
    portraitAlignment: '#portrait-alignment',
    portraitWidthRatio: '#portrait-width-ratio',
    portraitHeightRatio: '#portrait-height-ratio',
    portraitHorSpace: '#portrait-hor-space',
    portraitVerSpace: '#portrait-ver-space',
    portraitTopLeft: '#portrait-top-left',
    portraitTopCenter: '#portrait-top-center',
    portraitTopRight: '#portrait-top-right',
    portraitMidLeft: '#portrait-mid-left',
    portraitMidCenter: '#portrait-mid-center',
    portraitMidRight: '#portrait-mid-right',
    portraitBottomLeft: '#portrait-bottom-left',
    portraitBottomCenter: '#portrait-bottom-center',
    portraitBottomRight: '#portrait-bottom-right',
    portraitTopNodeUUID: '#portrait-top-node-uuid',
    portraitBottomNodeUUID: '#portrait-bottom-node-uuid',
    portraitLeftNodeUUID: '#portrait-left-node-uuid',
    portraitRightNodeUUID: '#portrait-right-node-uuid',
    portraitMinMax: '#portrait-min-max',
    portraitFollowNode: '#portrait-follow-node',
    portraitFollowedNodeUUID: '#portrait-followed-node-uuid',
    portraitVerSpaceType: '#portrait-ver-space-type',
    portraitHorSpaceType: '#portrait-hor-space-type',
    portraitFlipX: '#enable-portrait-flip-x',
    portraitFlipY: '#enable-portrait-flip-y',
    enableLandscape: '#enable-landscape',
    landscapeAlignment: '#landscape-alignment',
    landscapeWidthRatio: '#landscape-width-ratio',
    landscapeHeightRatio: '#landscape-height-ratio',
    landscapeHorSpace: '#landscape-hor-space',
    landscapeVerSpace: '#landscape-ver-space',
    landscapeTopLeft: '#landscape-top-left',
    landscapeTopCenter: '#landscape-top-center',
    landscapeTopRight: '#landscape-top-right',
    landscapeMidLeft: '#landscape-mid-left',
    landscapeMidCenter: '#landscape-mid-center',
    landscapeMidRight: '#landscape-mid-right',
    landscapeBottomLeft: '#landscape-bottom-left',
    landscapeBottomCenter: '#landscape-bottom-center',
    landscapeBottomRight: '#landscape-bottom-right',
    landscapeTopNodeUUID: '#landscape-top-node-uuid',
    landscapeBottomNodeUUID: '#landscape-bottom-node-uuid',
    landscapeLeftNodeUUID: '#landscape-left-node-uuid',
    landscapeRightNodeUUID: '#landscape-right-node-uuid',
    landscapeFollowNode: '#landscape-follow-node',
    landscapeFollowedNodeUUID: '#landscape-followed-node-uuid',
    landscapeMinMax: '#landscape-min-max',
    landscapeVerSpaceType: '#landscape-ver-space-type',
    landscapeHorSpaceType: '#landscape-hor-space-type',
    landscapeFlipX: '#enable-landscape-flip-x',
    landscapeFlipY: '#enable-landscape-flip-y',
    alignMode: '#align-mode',
    isCalculatingContainerBounds: '#is-calculating-container-bounds',
    isPositioningFromAnchorPoint: '#is-positioning-from-anchor-point',
    rotateCanvas: '#rotate-canvas',
    rotateCanvasPortrait: '#rotate-canvas-portrait',
    rotateCanvasLandscape: '#rotate-canvas-landscape',
    changeEditorDevice: '#change-editor-device',
    disabledContent: '#disabled_content',
    copyPastePortraitContent: '#copy-paste-portrait-content',
    //oneTimeExecution: '#recalculate-content-size'
};
exports.methodList = {
    cellOnClick: (_this, clickedCell, tree) => {
        for (var i = 0; i < tree.length; i++) {
            const e = tree[i];
            e.cell.style.background = "#303C4A";
        }
        clickedCell.style.background = "#F58D1E";
        if (clickedCell.id.includes("portrait")) {
            //console.log("P");
            _this.dump.value.portraitAlignment.value = clickedCell.id;
            _this.$.portraitAlignment.dispatch('change-dump');
            if (!_this.dump.value.enableLandscape.value) {
                _this.dump.value.landscapeAlignment.value = clickedCell.id.replace("portrait", "landscape");
                _this.$.landscapeAlignment.dispatch('change-dump');
            }
        }
        else {
            //console.log("L");
            _this.dump.value.landscapeAlignment.value = clickedCell.id;
            _this.$.landscapeAlignment.dispatch('change-dump');
        }
        //console.log("????????????????", _this.dump.value.portraitAlignment.value)
    },
    getLastCell: (_this, id) => {
        if (id == "portrait-top-left") {
            return _this.$.portraitTopLeft;
        }
        else if (id == "portrait-top-center") {
            return _this.$.portraitTopCenter;
        }
        else if (id == "portrait-top-right") {
            return _this.$.portraitTopRight;
        }
        else if (id == "portrait-mid-left") {
            return _this.$.portraitMidLeft;
        }
        else if (id == "portrait-mid-center") {
            return _this.$.portraitMidCenter;
        }
        else if (id == "portrait-mid-right") {
            return _this.$.portraitMidRight;
        }
        else if (id == "portrait-bottom-left") {
            return _this.$.portraitBottomLeft;
        }
        else if (id == "portrait-bottom-center") {
            return _this.$.portraitBottomCenter;
        }
        else if (id == "portrait-bottom-right") {
            return _this.$.portraitBottomRight;
        }
        else if (id == "landscape-top-left") {
            return _this.$.landscapeTopLeft;
        }
        else if (id == "landscape-top-center") {
            return _this.$.landscapeTopCenter;
        }
        else if (id == "landscape-top-right") {
            return _this.$.landscapeTopRight;
        }
        else if (id == "landscape-mid-left") {
            return _this.$.landscapeMidLeft;
        }
        else if (id == "landscape-mid-center") {
            return _this.$.landscapeMidCenter;
        }
        else if (id == "landscape-mid-right") {
            return _this.$.landscapeMidRight;
        }
        else if (id == "landscape-bottom-left") {
            return _this.$.landscapeBottomLeft;
        }
        else if (id == "landscape-bottom-center") {
            return _this.$.landscapeBottomCenter;
        }
        else if (id == "landscape-bottom-right") {
            return _this.$.landscapeBottomRight;
        }
    },
    checkEnableLandscape: (_this) => {
        if (_this.dump.value.enableLandscape.value == true) {
            _this.$.disabledContent.className = "";
        }
        else {
            _this.$.disabledContent.className = "disable";
        }
    },
    openTabAccordingToOrientation: (_this) => {
        if (_this.dump.value.lastOrientation.value == true) { // true - dikey
            _this.$.portraitButton.onclick();
            //console.log("1");
        }
        else { // false -yatay
            if (_this.dump.value.enableLandscape.value == true) {
                _this.$.landscapeButton.onclick();
                //console.log("2");
            }
            else {
                _this.$.portraitButton.onclick(false); // can rotate canvas
                //console.log("3");
            }
        }
    },
    copyPastePortraitValues: (_this) => {
        let portraitElements = [
            { p: _this.dump.value.portraitWidthRatio, l: _this.dump.value.landscapeWidthRatio, h: _this.$.landscapeWidthRatio },
            { p: _this.dump.value.portraitHeightRatio, l: _this.dump.value.landscapeHeightRatio, h: _this.$.landscapeHeightRatio },
            { p: _this.dump.value.portraitHorSpace, l: _this.dump.value.landscapeHorSpace, h: _this.$.landscapeHorSpace },
            { p: _this.dump.value.portraitVerSpace, l: _this.dump.value.landscapeVerSpace, h: _this.$.landscapeVerSpace },
            { p: _this.dump.value.portraitMinMax, l: _this.dump.value.landscapeMinMax, h: _this.$.landscapeMinMax },
            { p: _this.dump.value.portraitVerSpaceType, l: _this.dump.value.landscapeVerSpaceType, h: _this.$.landscapeVerSpaceType },
            { p: _this.dump.value.portraitHorSpaceType, l: _this.dump.value.landscapeHorSpaceType, h: _this.$.landscapeHorSpaceType },
            { p: _this.dump.value.portraitLeftNodeUUID, l: _this.dump.value.landscapeLeftNodeUUID, h: _this.$.landscapeLeftNodeUUID },
            { p: _this.dump.value.portraitRightNodeUUID, l: _this.dump.value.landscapeRightNodeUUID, h: _this.$.landscapeRightNodeUUID },
            { p: _this.dump.value.portraitTopNodeUUID, l: _this.dump.value.landscapeTopNodeUUID, h: _this.$.landscapeTopNodeUUID },
            { p: _this.dump.value.portraitBottomNodeUUID, l: _this.dump.value.landscapeBottomNodeUUID, h: _this.$.landscapeBottomNodeUUID },
            { p: _this.dump.value.portraitFlipX, l: _this.dump.value.landscapeFlipX, h: _this.$.landscapeFlipX },
            { p: _this.dump.value.portraitFlipY, l: _this.dump.value.landscapeFlipY, h: _this.$.landscapeFlipY }
        ];
        portraitElements.forEach(e => {
            e.l.value = e.p.value;
            e.h.dispatch("change-dump");
        });
        //hp -> htmlPortrait
        let alignmentCells = [
            { l: _this.dump.value.landscapeAlignment, hp: _this.$.portraitTopLeft, hl: _this.$.landscapeAlignment, hl2: _this.$.landscapeTopLeft },
            { l: _this.dump.value.landscapeAlignment, hp: _this.$.portraitTopCenter, hl: _this.$.landscapeAlignment, hl2: _this.$.landscapeTopCenter },
            { l: _this.dump.value.landscapeAlignment, hp: _this.$.portraitTopRight, hl: _this.$.landscapeAlignment, hl2: _this.$.landscapeTopRight },
            { l: _this.dump.value.landscapeAlignment, hp: _this.$.portraitMidLeft, hl: _this.$.landscapeAlignment, hl2: _this.$.landscapeMidLeft },
            { l: _this.dump.value.landscapeAlignment, hp: _this.$.portraitMidCenter, hl: _this.$.landscapeAlignment, hl2: _this.$.landscapeMidCenter },
            { l: _this.dump.value.landscapeAlignment, hp: _this.$.portraitMidRight, hl: _this.$.landscapeAlignment, hl2: _this.$.landscapeMidRight },
            { l: _this.dump.value.landscapeAlignment, hp: _this.$.portraitBottomLeft, hl: _this.$.landscapeAlignment, hl2: _this.$.landscapeBottomLeft },
            { l: _this.dump.value.landscapeAlignment, hp: _this.$.portraitBottomCenter, hl: _this.$.landscapeAlignment, hl2: _this.$.landscapeBottomCenter },
            { l: _this.dump.value.landscapeAlignment, hp: _this.$.portraitBottomRight, hl: _this.$.landscapeAlignment, hl2: _this.$.landscapeBottomRight },
        ];
        let neededAlignmentIdVal = _this.dump.value.portraitAlignment.value.replace("portrait", "landscape");
        alignmentCells.forEach(e => {
            if (neededAlignmentIdVal == e.hl2.id) {
                e.l.value = neededAlignmentIdVal;
                e.hl.dispatch('change-dump');
            }
        });
    },
    changeWidthHeightRatioCursorsColor: (_this, type = 1) => {
        let circularWidthHandler;
        let circularHeightHandler;
        if (type == 1) { // portrait
            circularWidthHandler = _this.$.portraitWidthRatio.$cursor.getElementsByTagName("div")[0];
            circularHeightHandler = _this.$.portraitHeightRatio.$cursor.getElementsByTagName("div")[0];
        }
        else { // landscape
            circularWidthHandler = _this.$.landscapeWidthRatio.$cursor.getElementsByTagName("div")[0];
            circularHeightHandler = _this.$.landscapeHeightRatio.$cursor.getElementsByTagName("div")[0];
        }
        if (_this.dump.value.usingMinOrMax.value == 1) {
            circularWidthHandler.style.borderColor = "#229B2F"; //green
            circularHeightHandler.style.borderColor = "#9B8622"; // yellow
        }
        else if (_this.dump.value.usingMinOrMax.value == 2) {
            circularWidthHandler.style.borderColor = "#9B8622"; // yellow
            circularHeightHandler.style.borderColor = "#229B2F"; //green
        }
        else {
            circularWidthHandler.style.borderColor = "#CACACA"; // white
            circularHeightHandler.style.borderColor = "#CACACA"; // white
        }
    },
    setFollowedNodeInitialValues: (_this, type) => {
        if (type == 1) {
            if (_this.dump.value.portraitFollowNode.value == true) {
                _this.$.portraitFollowedNodeUUID.style.pointerEvents = "auto";
                _this.$.portraitFollowedNodeUUID.style.opacity = "1";
                if (_this.dump.value.portraitFollowedNodeUUID.value) {
                    _this.$.portraitFollowedNodeUUID.$area.style.backgroundColor = "#227F9B";
                }
                else {
                    _this.$.portraitFollowedNodeUUID.$area.style.backgroundColor = "transparent";
                }
                _this.$.portraitWidget.style.pointerEvents = "none";
                _this.$.portraitWidget.style.opacity = 0.4;
            }
            else {
                _this.$.portraitFollowedNodeUUID.style.pointerEvents = "none";
                _this.$.portraitFollowedNodeUUID.style.opacity = "0.4";
                //console.log(_this.$.portraitFollowedNodeUUID)
                _this.$.portraitFollowedNodeUUID.$area.style.backgroundColor = "transparent";
                _this.$.portraitWidget.style.pointerEvents = "initial";
                _this.$.portraitWidget.style.opacity = 1;
            }
        }
        else {
            if (_this.dump.value.landscapeFollowNode.value == true) {
                _this.$.landscapeFollowedNodeUUID.style.pointerEvents = "auto";
                _this.$.landscapeFollowedNodeUUID.style.opacity = "1";
                if (_this.dump.value.landscapeFollowedNodeUUID.value) {
                    _this.$.landscapeFollowedNodeUUID.$area.style.backgroundColor = "#227F9B";
                }
                else {
                    _this.$.landscapeFollowedNodeUUID.$area.style.backgroundColor = "transparent";
                }
                _this.$.landscapeWidget.style.pointerEvents = "none";
                _this.$.landscapeWidget.style.opacity = 0.4;
            }
            else {
                _this.$.landscapeFollowedNodeUUID.style.pointerEvents = "none";
                _this.$.landscapeFollowedNodeUUID.style.opacity = "0.4";
                _this.$.landscapeFollowedNodeUUID.$area.style.backgroundColor = "transparent";
                _this.$.landscapeWidget.style.pointerEvents = "initial";
                _this.$.landscapeWidget.style.opacity = 1;
            }
        }
    },
    openTab: (_this, target, tabName) => {
        _this.$.portrait.style.display = "none";
        _this.$.landscape.style.display = "none";
        _this.$.settings.style.display = "none";
        _this.$.portraitButton.className = _this.$.portraitButton.className.replace(" active", "");
        _this.$.landscapeButton.className = _this.$.landscapeButton.className.replace(" active", "");
        _this.$.settingsButton.className = _this.$.settingsButton.className.replace(" active", "");
        if (tabName == "Portrait") {
            _this.$.portrait.style.display = "block";
        }
        else if (tabName == "Landscape") {
            _this.$.landscape.style.display = "block";
        }
        else {
            _this.$.settings.style.display = "block";
        }
        target.className += " active";
    },
    updateRefNodesBgColors: (_this) => {
        let refs = [
            { sc: _this.dump.value.portraitLeftNodeUUID, ht: _this.$.portraitLeftNodeUUID },
            { sc: _this.dump.value.portraitRightNodeUUID, ht: _this.$.portraitRightNodeUUID },
            { sc: _this.dump.value.portraitTopNodeUUID, ht: _this.$.portraitTopNodeUUID },
            { sc: _this.dump.value.portraitBottomNodeUUID, ht: _this.$.portraitBottomNodeUUID },
            { sc: _this.dump.value.landscapeLeftNodeUUID, ht: _this.$.landscapeLeftNodeUUID },
            { sc: _this.dump.value.landscapeRightNodeUUID, ht: _this.$.landscapeRightNodeUUID },
            { sc: _this.dump.value.landscapeTopNodeUUID, ht: _this.$.landscapeTopNodeUUID },
            { sc: _this.dump.value.landscapeBottomNodeUUID, ht: _this.$.landscapeBottomNodeUUID },
        ];
        refs.forEach(ref => {
            if (ref.sc.value) {
                ref.ht.$area.style.backgroundColor = "#227F9B";
            }
            else {
                ref.ht.$area.style.backgroundColor = "transparent";
            }
        });
    }
};
function update(dump) {
    //console.log("UPDATE")
    //console.log("FROM UPDATE");
    this.dump = dump;
    this.$.portraitAlignment.dump = this.dump.value.portraitAlignment;
    this.$.portraitAlignment.value = this.dump.value.portraitAlignment.value;
    this.$.landscapeAlignment.dump = this.dump.value.landscapeAlignment;
    this.$.landscapeAlignment.value = this.dump.value.landscapeAlignment.value;
    this.componentHandlers.forEach((handler) => {
        handler.htmlEl.dump = this.dump.value[handler.scriptEl];
        handler.htmlEl.value = this.dump.value[handler.scriptEl].value;
    });
    // //if .active class added so classList length is 1
    const lastCell = exports.methodList.getLastCell(this, this.$.portraitButton.classList.length == 1 ? this.dump.value.portraitAlignment.value : this.dump.value.landscapeAlignment.value);
    exports.methodList.cellOnClick(this, lastCell, this.tree);
    exports.methodList.checkEnableLandscape(this);
    if (this.$.portraitButton.classList.length == 1 && this.dump.value.enableLandscape.value == false) {
        exports.methodList.setFollowedNodeInitialValues(this, 1);
        exports.methodList.changeWidthHeightRatioCursorsColor(this, 1);
    }
    else {
        exports.methodList.setFollowedNodeInitialValues(this, 2);
        exports.methodList.changeWidthHeightRatioCursorsColor(this, 2);
    }
    exports.methodList.updateRefNodesBgColors(this);
    if (!this.oneTimeFlag) {
        this.oneTimeFlag = true;
        exports.methodList.openTabAccordingToOrientation(this);
    }
}
exports.update = update;
function ready() {
    // Listen for commit events on the input, update the dump data when the input commits data, and use prop to send change-dump events
    //console.log("READY")
    this.componentHandlers = [
        {
            htmlEl: this.$.portraitWidthRatio,
            scriptEl: "portraitWidthRatio",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeWidthRatio.value = this.dump.value.portraitWidthRatio.value;
                    this.$.landscapeWidthRatio.dispatch("change-dump");
                }
            },
        },
        {
            htmlEl: this.$.portraitHeightRatio,
            scriptEl: "portraitHeightRatio",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeHeightRatio.value = this.dump.value.portraitHeightRatio.value;
                    this.$.landscapeHeightRatio.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitHorSpace,
            scriptEl: "portraitHorSpace",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeHorSpace.value = this.dump.value.portraitHorSpace.value;
                    this.$.landscapeHorSpace.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitVerSpace,
            scriptEl: "portraitVerSpace",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeVerSpace.value = this.dump.value.portraitVerSpace.value;
                    this.$.landscapeVerSpace.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitMinMax,
            scriptEl: "portraitMinMax",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeMinMax.value = this.dump.value.portraitMinMax.value;
                    this.$.landscapeMinMax.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitVerSpaceType,
            scriptEl: "portraitVerSpaceType",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeVerSpaceType.value = this.dump.value.portraitVerSpaceType.value;
                    this.$.landscapeVerSpaceType.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitHorSpaceType,
            scriptEl: "portraitHorSpaceType",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeHorSpaceType.value = this.dump.value.portraitHorSpaceType.value;
                    this.$.landscapeHorSpaceType.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitLeftNodeUUID,
            scriptEl: "portraitLeftNodeUUID",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeLeftNodeUUID.value = this.dump.value.portraitLeftNodeUUID.value;
                    this.$.landscapeLeftNodeUUID.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitRightNodeUUID,
            scriptEl: "portraitRightNodeUUID",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeRightNodeUUID.value = this.dump.value.portraitRightNodeUUID.value;
                    this.$.landscapeRightNodeUUID.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitTopNodeUUID,
            scriptEl: "portraitTopNodeUUID",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeTopNodeUUID.value = this.dump.value.portraitTopNodeUUID.value;
                    this.$.landscapeTopNodeUUID.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitBottomNodeUUID,
            scriptEl: "portraitBottomNodeUUID",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeBottomNodeUUID.value = this.dump.value.portraitBottomNodeUUID.value;
                    this.$.landscapeBottomNodeUUID.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitFollowNode,
            scriptEl: "portraitFollowNode",
            onChange: true,
            callback: () => {
                exports.methodList.setFollowedNodeInitialValues(this, 1);
            },
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeFollowNode.value = this.dump.value.portraitFollowNode.value;
                    this.$.landscapeFollowNode.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitFollowedNodeUUID,
            scriptEl: "portraitFollowedNodeUUID",
            onChange: true,
            callback: () => {
            },
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeFollowedNodeUUID.value = this.dump.value.portraitFollowedNodeUUID.value;
                    this.$.landscapeFollowedNodeUUID.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitFlipX,
            scriptEl: "portraitFlipX",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeFlipX.value = this.dump.value.portraitFlipX.value;
                    this.$.landscapeFlipX.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.portraitFlipY,
            scriptEl: "portraitFlipY",
            onChange: true,
            afterCallback: () => {
                if (!this.dump.value.enableLandscape.value) {
                    this.dump.value.landscapeFlipY.value = this.dump.value.portraitFlipY.value;
                    this.$.landscapeFlipY.dispatch("change-dump");
                }
            }
        },
        {
            htmlEl: this.$.enableLandscape,
            scriptEl: "enableLandscape",
            onChange: true,
            callback: () => {
                exports.methodList.checkEnableLandscape(this);
            }
        },
        {
            htmlEl: this.$.landscapeWidthRatio,
            scriptEl: "landscapeWidthRatio",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeHeightRatio,
            scriptEl: "landscapeHeightRatio",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeHorSpace,
            scriptEl: "landscapeHorSpace",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeVerSpace,
            scriptEl: "landscapeVerSpace",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeMinMax,
            scriptEl: "landscapeMinMax",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeVerSpaceType,
            scriptEl: "landscapeVerSpaceType",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeFlipX,
            scriptEl: "landscapeFlipX",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeFlipY,
            scriptEl: "landscapeFlipY",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeHorSpaceType,
            scriptEl: "landscapeHorSpaceType",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeLeftNodeUUID,
            scriptEl: "landscapeLeftNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.landscapeRightNodeUUID,
            scriptEl: "landscapeRightNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.landscapeTopNodeUUID,
            scriptEl: "landscapeTopNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.landscapeBottomNodeUUID,
            scriptEl: "landscapeBottomNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.landscapeFollowNode,
            scriptEl: "landscapeFollowNode",
            onChange: true,
            callback: () => {
                exports.methodList.setFollowedNodeInitialValues(this, 2);
            }
        },
        {
            htmlEl: this.$.landscapeFollowedNodeUUID,
            scriptEl: "landscapeFollowedNodeUUID",
            onChange: true,
            callback: () => {
            }
        },
        {
            htmlEl: this.$.rotateCanvas,
            scriptEl: "rotateCanvas",
            onChange: false,
            callback: () => {
                this.dump.value.rotateCanvas.value = true;
            }
        },
        {
            htmlEl: this.$.rotateCanvasPortrait,
            scriptEl: "rotateCanvasPortrait",
            onChange: false,
        },
        {
            htmlEl: this.$.rotateCanvasLandscape,
            scriptEl: "rotateCanvasLandscape",
            onChange: false,
        },
        {
            htmlEl: this.$.changeEditorDevice,
            scriptEl: "changeEditorDevice",
            onChange: false,
            callback: () => {
                this.dump.value.changeEditorDevice.value = true;
            }
        },
        {
            htmlEl: this.$.alignMode,
            scriptEl: "alignMode",
            onChange: true
        },
        {
            htmlEl: this.$.isCalculatingContainerBounds,
            scriptEl: "isCalculatingContainerBounds",
            onChange: true,
        },
        {
            htmlEl: this.$.isPositioningFromAnchorPoint,
            scriptEl: "isPositioningFromAnchorPoint",
            onChange: true
        },
        // {
        //     htmlEl: this.$.oneTimeExecution,
        //     scriptEl: "oneTimeExecution",
        //     onChange: true,
        //     callback: () => {
        //         this.dump.value..value = false;
        //     }oneTimeExecution
        // },
    ];
    this.componentHandlers.forEach((handler) => {
        handler.htmlEl.addEventListener('confirm', (e) => {
            this.dump.value[handler.scriptEl].value = e.target.value;
            if (handler.callback) {
                handler.callback();
            }
            handler.htmlEl.dispatch('change-dump');
            if (handler.afterCallback) {
                handler.afterCallback();
            }
        });
        if (handler.onChange) {
            handler.htmlEl.onchange = (e) => {
                this.dump.value[handler.scriptEl].value = e.target.value;
                if (handler.callback) {
                    handler.callback();
                }
                handler.htmlEl.dispatch('change-dump');
                if (handler.afterCallback) {
                    handler.afterCallback();
                }
            };
        }
    });
    this.$.portraitButton.onclick = (canRotateCanvas = true) => {
        exports.methodList.openTab(this, this.$.portraitButton, 'Portrait');
        const lastCell = exports.methodList.getLastCell(this, this.dump.value.portraitAlignment.value);
        exports.methodList.cellOnClick(this, lastCell, this.tree);
        if (canRotateCanvas && this.dump.value.enableLandscape.value) {
            this.dump.value.rotateCanvasPortrait.value = true;
            this.$.rotateCanvasPortrait.dispatch('change-dump');
        }
    };
    this.$.landscapeButton.onclick = (e) => {
        exports.methodList.openTab(this, this.$.landscapeButton, 'Landscape');
        const lastCell = exports.methodList.getLastCell(this, this.dump.value.landscapeAlignment.value);
        exports.methodList.cellOnClick(this, lastCell, this.tree);
        this.dump.value.rotateCanvasLandscape.value = true;
        this.$.rotateCanvasLandscape.dispatch('change-dump');
    };
    this.$.settingsButton.onclick = (e) => {
        exports.methodList.openTab(this, this.$.settingsButton, 'Settings');
    };
    exports.methodList.openTab(this, this.$.portraitButton, 'Portrait');
    this.tree = [
        {
            cell: this.$.portraitTopLeft,
        },
        {
            cell: this.$.portraitTopCenter,
        },
        {
            cell: this.$.portraitTopRight,
        },
        {
            cell: this.$.portraitMidLeft,
        },
        {
            cell: this.$.portraitMidCenter,
        },
        {
            cell: this.$.portraitMidRight,
        },
        {
            cell: this.$.portraitBottomLeft,
        },
        {
            cell: this.$.portraitBottomCenter,
        },
        {
            cell: this.$.portraitBottomRight,
        },
        {
            cell: this.$.landscapeTopLeft,
        },
        {
            cell: this.$.landscapeTopCenter,
        },
        {
            cell: this.$.landscapeTopRight,
        },
        {
            cell: this.$.landscapeMidLeft,
        },
        {
            cell: this.$.landscapeMidCenter,
        },
        {
            cell: this.$.landscapeMidRight,
        },
        {
            cell: this.$.landscapeBottomLeft,
        },
        {
            cell: this.$.landscapeBottomCenter,
        },
        {
            cell: this.$.landscapeBottomRight,
        }
    ];
    this.tree.forEach((e, i) => {
        e.cell.addEventListener('confirm', () => {
            exports.methodList.cellOnClick(this, e.cell, this.tree);
        });
    });
    this.$.copyPastePortraitContent.onclick = () => {
        exports.methodList.copyPastePortraitValues(this);
    };
}
exports.ready = ready;
