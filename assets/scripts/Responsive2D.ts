import { _decorator, Component, Node, CCFloat, Enum, view, UITransform, screen, find, Vec3, Canvas } from 'cc';
import { EDITOR } from 'cc/env';
//import { DynamicCanvas } from 'db://responsive2d/DynamicCanvas';
const { ccclass, property, disallowMultiple, executeInEditMode } = _decorator;

@ccclass('Responsive2D')
@disallowMultiple(true)
@executeInEditMode(true)
export class Responsive2D extends Component {
    @property
    public portraitWidthRatio = 0.25;
    @property
    public portraitHeightRatio = 0.25;
    @property
    public portraitHorSpace = 0;
    @property
    public portraitHorSpaceType = 1;
    @property
    public portraitVerSpace = 0;
    @property
    public portraitVerSpaceType = 1;
    @property
    public portraitAlignment = "portrait-mid-center";
    @property
    public portraitTopNodeUUID = ""; //UUID
    @property
    public portraitBottomNodeUUID = "";
    @property
    public portraitLeftNodeUUID = "";
    @property
    public portraitRightNodeUUID = "";
    @property
    public portraitMinMax = 1;
    @property
    public portraitFlipX = false;
    @property
    public portraitFlipY = false;

    @property
    public enableLandscape = false;
    @property
    public landscapeWidthRatio = 0.25;
    @property
    public landscapeHeightRatio = 0.25;
    @property
    public landscapeHorSpace = 0;
    @property
    public landscapeHorSpaceType = 1;
    @property
    public landscapeVerSpace = 0;
    @property
    public landscapeVerSpaceType = 1;
    @property
    public landscapeAlignment = "landscape-mid-center";
    @property
    public landscapeTopNodeUUID = ""; //UUID
    @property
    public landscapeBottomNodeUUID = "";
    @property
    public landscapeLeftNodeUUID = "";
    @property
    public landscapeRightNodeUUID = "";
    @property
    public landscapeMinMax = 1;
    @property
    public landscapeFlipX = false;
    @property
    public landscapeFlipY = false;


    @property
    public isCalculatingContainerBounds = false;
    @property
    public isPositioningFromAnchorPoint = false;
    @property
    public alignMode = 3;


    @property
    public rotateCanvas = false;

    @property
    public rotateCanvasPortrait = false;
    @property
    public rotateCanvasLandscape = false;

    @property
    public changeEditorDevice = false;

    @property
    public oneTimeExecution = false;

    private contAnchorXInEditor = 0;
    private contAnchorYInEditor = 0;

    private contAnchorX = 0;
    private contAnchorY = 0;
    private nodeOffsetWidth = 0;
    private nodeOffsetHeight = 0;

    private isEventsAdded = false;
    private refNodes = [];
    private nodeInd = null;

    start() {
        this.oneTimeExecution = false;

        if (this.alignMode == 3) {
            view.on('canvas-resize', () => {
                this.resize();
            });
        }
        this.resize();
    }

    resize() {

        this.rotateUiCanvas();
        this.switchDevice();

        const node = this.node;
        this.nodeInd = this.node.parent.children.indexOf(node);
        const nodeTransform = node.getComponent(UITransform);

        var deviceSize;
        if (EDITOR) {
            deviceSize = view.getDesignResolutionSize();
        }

        const screenSize = screen.windowSize;
        const viewScaleX = view.getScaleX();
        const viewScaleY = view.getScaleY();
        let w = (deviceSize && deviceSize.width) || screenSize.width / viewScaleX;
        let h = (deviceSize && deviceSize.height) || screenSize.height / viewScaleY;

        //console.log(this.node.parent.name, this.node.name)

        if (!this.node.parent.getComponent(Canvas)) {
            const parentTransform = this.node.parent.getComponent(UITransform);
            w = parentTransform.width;
            h = parentTransform.height;
        }

        const mostLeft = -w * 0.5;
        const mostRight = w * 0.5;
        const mostTop = h * 0.5;
        const mostBottom = -h * 0.5;
        let width = w;
        let height = h;
        let left = mostLeft;
        let right = mostRight;
        let top = mostTop;
        let bottom = mostBottom;

        let widthRatio = (w > h && this.enableLandscape) ? this.landscapeWidthRatio : this.portraitWidthRatio;
        let heightRatio = (w > h && this.enableLandscape) ? this.landscapeHeightRatio : this.portraitHeightRatio;
        let minMax = (w > h && this.enableLandscape) ? this.landscapeMinMax : this.portraitMinMax;
        let leftNodeUUID = (w > h && this.enableLandscape) ? this.landscapeLeftNodeUUID : this.portraitLeftNodeUUID;
        let rightNodeUUID = (w > h && this.enableLandscape) ? this.landscapeRightNodeUUID : this.portraitRightNodeUUID;
        let topNodeUUID = (w > h && this.enableLandscape) ? this.landscapeTopNodeUUID : this.portraitTopNodeUUID;
        let bottomNodeUUID = (w > h && this.enableLandscape) ? this.landscapeBottomNodeUUID : this.portraitBottomNodeUUID;
        let alignment = (w > h && this.enableLandscape) ? this.landscapeAlignment : this.portraitAlignment;
        let horSpace = (w > h && this.enableLandscape) ? this.landscapeHorSpace : this.portraitHorSpace;
        let verSpace = (w > h && this.enableLandscape) ? this.landscapeVerSpace : this.portraitVerSpace;
        let horizontalSpaceType = (w > h && this.enableLandscape) ? this.landscapeHorSpaceType : this.portraitHorSpaceType;
        let verticalSpaceType = (w > h && this.enableLandscape) ? this.landscapeVerSpaceType : this.portraitVerSpaceType;
        let flipX = (w > h && this.enableLandscape) ? this.landscapeFlipX : this.portraitFlipX;
        let flipY = (w > h && this.enableLandscape) ? this.landscapeFlipY : this.portraitFlipY;

        let allChildNodes;
        if (!this.node.parent.getComponent(Canvas)) {
            allChildNodes = this.node.parent;
        } else {
            allChildNodes = find("Canvas");
        }

        let leftNode = null;
        let rightNode = null;
        let topNode = null;
        let bottomNode = null;
        this.refNodes = [];
        allChildNodes.children.forEach(child => {
            if (child.uuid == leftNodeUUID) {
                leftNode = child;
                this.refNodes.push(leftNode);
            } else if (child.uuid == rightNodeUUID) {
                rightNode = child;
                this.refNodes.push(rightNode);
            } if (child.uuid == topNodeUUID) {
                topNode = child;
                this.refNodes.push(topNode);
            } if (child.uuid == bottomNodeUUID) {
                bottomNode = child;
                this.refNodes.push(bottomNode);
            }
        });


        //console.log("RESPONSIVE 2D START", this.node.name, this.node.children.length, this.isCalculatingContainerBounds, this.oneTimeExecution)
        if (this.node.children.length /* && !this.node.getComponent(Sprite) && !this.node.getComponent(sp.Skeleton) */ && this.isCalculatingContainerBounds && !this.oneTimeExecution) {
            /* NOT TESTED FOR DIFFERENT NODES */
            this.oneTimeExecution = true;

            const contTransform = this.node.getComponent(UITransform);
            this.contAnchorXInEditor = contTransform.anchorX;
            this.contAnchorYInEditor = contTransform.anchorY;

            const { minX, minY, width, height } = this.calculateContainerBounds();
            contTransform.setContentSize(width, height);


            this.contAnchorX = 0.5 - (contTransform.width * 0.5 + minX) / contTransform.width;
            this.contAnchorY = 0.5 - (contTransform.height * 0.5 + minY) / contTransform.height;

            contTransform.setAnchorPoint(
                this.contAnchorX,
                this.contAnchorY
            );

            if (!this.isEventsAdded) {
                this.addEvents();
            }
        }

        // ***
        this.resizeRefNodesIfTheirRenderOrdersAreAfterThisNode();

        if (leftNode) {
            const leftNodeTransform = leftNode.getComponent(UITransform);
            leftNode.displayWidth = leftNodeTransform.width * Math.abs(leftNode.scale.x);
            leftNode.displayHeight = leftNodeTransform.height * Math.abs(leftNode.scale.y);

            left = leftNode.position.x + leftNode.displayWidth * (1 - leftNodeTransform.anchorX);
            //width -= Math.abs(mostLeft - leftNode.position.x) + leftNodeTransform.width * leftNode.scale.x * (1 - leftNodeTransform.anchorX);
            width -= Math.abs(mostLeft - left);
        }

        if (rightNode) {
            const rightNodeTransform = rightNode.getComponent(UITransform);
            rightNode.displayWidth = rightNodeTransform.width * Math.abs(rightNode.scale.x);
            rightNode.displayHeight = rightNodeTransform.height * Math.abs(rightNode.scale.y);

            right = rightNode.position.x - rightNode.displayWidth * (rightNodeTransform.anchorX);
            //width -= Math.abs(mostRight - rightNode.position.x) + rightNodeTransform.width * rightNode.scale.x * (rightNodeTransform.anchorX);
            width -= Math.abs(mostRight - right);
        }

        if (topNode) {
            const topNodeTransform = topNode.getComponent(UITransform);
            topNode.displayWidth = topNodeTransform.width * Math.abs(topNode.scale.x);
            topNode.displayHeight = topNodeTransform.height * Math.abs(topNode.scale.y);

            top = topNode.position.y - topNode.displayHeight * topNodeTransform.anchorY;
            //height -= Math.abs(mostTop - topNode.position.y) + topNodeTransform.height * topNode.scale.y * topNodeTransform.anchorY;
            height -= Math.abs(mostTop - top);
        }

        if (bottomNode) {
            const bottomNodeInd = bottomNode.parent.children.indexOf(bottomNode);
            if (bottomNodeInd > this.nodeInd) {
                bottomNode.getComponent(Responsive2D).resize();
            }

            const bottomNodeTransform = bottomNode.getComponent(UITransform);
            bottomNode.displayWidth = bottomNodeTransform.width * Math.abs(bottomNode.scale.x);
            bottomNode.displayHeight = bottomNodeTransform.height * Math.abs(bottomNode.scale.y);

            bottom = bottomNode.position.y + bottomNode.displayHeight * (1 - bottomNodeTransform.anchorY);
            //height -= Math.abs(mostBottom - bottomNode.position.y) + bottomNodeTransform.height * bottomNode.scale.y * (1 - bottomNodeTransform.anchorY);
            height -= Math.abs(mostBottom - bottom);
        }


        let scaleX;
        let scaleY;
        const scaleObj = { x: width * widthRatio / nodeTransform.width, y: height * heightRatio / nodeTransform.height }
        if (minMax == 1) {
            let scale = Math.min(scaleObj.x, scaleObj.y);
            scaleX = scale;
            scaleY = scale;
        } else if (minMax == 2) {
            let scale = Math.max(scaleObj.x, scaleObj.y);
            scaleX = scale;
            scaleY = scale;
        } else if (minMax == 3) {
            scaleX = scaleObj.x;
            scaleY = scaleObj.y;
        }

        let flipScalar = { x: 1, y: 1 };
        !flipX ? flipScalar.x = 1 : flipScalar.x = -1;
        !flipY ? flipScalar.y = 1 : flipScalar.y = -1;

        node.setScale(new Vec3(scaleX * flipScalar.x, scaleY * flipScalar.y, node.scale.z));

        const nodeDisplayWidth = nodeTransform.width * scaleX;
        const nodeDisplayHeight = nodeTransform.height * scaleY;

        this.nodeOffsetWidth = nodeDisplayWidth * (this.contAnchorX - this.contAnchorXInEditor);
        this.nodeOffsetHeight = nodeDisplayHeight * (this.contAnchorY - this.contAnchorYInEditor);

        //console.log(nodeDisplayWidth, this.contAnchorX, this.contAnchorXInEditor, this.node.name)
        //console.log(widthRatio, heightRatio)

        const splittedAlignment = alignment.split("-");

        if (alignment) {
            var space;
            if (horizontalSpaceType == 1) {
                space = (horSpace * 0.01) * w;
            } else if (horizontalSpaceType == 2) {
                space = horSpace;
            } else if (horizontalSpaceType == 3) {
                space = (horSpace * 0.01) * nodeDisplayWidth;
            } else if (horizontalSpaceType == 4) { // left node
                space = (horSpace * 0.01) * (leftNode ? leftNode.displayWidth : width);
                !leftNode && console.warn("leftNode cannot found! Using available width space for " + this.node.name);
            } else if (horizontalSpaceType == 5) { // right node
                space = (horSpace * 0.01) * (rightNode ? rightNode.displayWidth : width);
                !rightNode && console.warn("rightNode cannot found! Using available width space for " + this.node.name);
            } else if (horizontalSpaceType == 6) { // top node
                space = (horSpace * 0.01) * (topNode ? topNode.displayWidth : width);
                !topNode && console.warn("topNode cannot found! Using available width space for " + this.node.name);
            } else if (horizontalSpaceType == 7) { // bottom node
                space = (horSpace * 0.01) * (bottomNode ? bottomNode.displayWidth : width);
                !bottomNode && console.warn("bottomNode cannot found! Using available width space for " + this.node.name);
            }

            switch (splittedAlignment[2]) {
                case "left": //left

                    var offsetWidth;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetWidth = this.nodeOffsetWidth;
                        } else {
                            offsetWidth = 0;
                        }
                    } else {
                        offsetWidth = nodeDisplayWidth * nodeTransform.anchorX;
                    }



                    node.setPosition(
                        left + space + offsetWidth,
                        node.position.y,
                        node.position.z
                    );
                    break;
                case "center": //center

                    var offsetWidth;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetWidth = this.nodeOffsetWidth;
                        } else {
                            offsetWidth = 0;
                        }
                    } else {
                        offsetWidth = nodeDisplayWidth * -(0.5 - nodeTransform.anchorX);
                    }


                    node.setPosition(
                        0 + space + (left + right) * 0.5 + offsetWidth,
                        node.position.y,
                        node.position.z
                    );
                    break;
                case "right": //right

                    var offsetWidth;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetWidth = this.nodeOffsetWidth;
                        } else {
                            offsetWidth = 0;
                        }
                    } else {
                        offsetWidth = -nodeDisplayWidth * (1 - nodeTransform.anchorX);
                    }

                    node.setPosition(
                        right + space + offsetWidth,
                        node.position.y,
                        node.position.z
                    );
                    break;
            }
        }

        if (alignment) {
            var space;
            if (verticalSpaceType == 1) {
                space = (verSpace * 0.01) * h;
            } else if (verticalSpaceType == 2) {
                space = verSpace;
            } else if (verticalSpaceType == 3) {
                space = (verSpace * 0.01) * nodeDisplayHeight;
            } else if (verticalSpaceType == 4) { // left node
                space = (verSpace * 0.01) * (leftNode ? leftNode.displayHeight : height);
                !leftNode && console.warn("leftNode cannot found! Using available height space for " + this.node.name);
            } else if (verticalSpaceType == 5) { // right node
                space = (verSpace * 0.01) * (rightNode ? rightNode.displayHeight : height);
                !rightNode && console.warn("rightNode cannot found! Using available height space for " + this.node.name);
            } else if (verticalSpaceType == 6) { // top node
                space = (verSpace * 0.01) * (topNode ? topNode.displayHeight : height);
                !topNode && console.warn("topNode cannot found! Using available height space for " + this.node.name);
            } else if (verticalSpaceType == 7) { // bottom node
                space = (verSpace * 0.01) * (bottomNode ? bottomNode.displayHeight : height);
                !bottomNode && console.warn("bottomNode cannot found! Using available height space for " + this.node.name);
            }
            switch (splittedAlignment[1]) {
                case "top": //top
                    var offsetHeight;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetHeight = this.nodeOffsetHeight;
                        } else {
                            offsetHeight = 0;
                        }
                    } else {
                        offsetHeight = -nodeDisplayHeight * (1 - nodeTransform.anchorY);
                    }

                    node.setPosition(
                        node.position.x,
                        top + space + offsetHeight,
                        node.position.z
                    );
                    break;
                case "mid": //middle
                    var offsetHeight;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetHeight = this.nodeOffsetHeight;
                        } else {
                            offsetHeight = 0;
                        }
                    } else {
                        offsetHeight = nodeDisplayHeight * -(0.5 - nodeTransform.anchorY);
                    }

                    node.setPosition(
                        node.position.x,
                        0 + space + (top + bottom) * 0.5 + offsetHeight,
                        node.position.z
                    );
                    break;
                case "bottom": //bottom
                    var offsetHeight;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetHeight = this.nodeOffsetHeight;
                        } else {
                            offsetHeight = 0;
                        }
                    } else {
                        offsetHeight = nodeDisplayHeight * nodeTransform.anchorY;
                    }

                    node.setPosition(
                        node.position.x,
                        bottom + space + offsetHeight,
                        node.position.z
                    );
                    break;
            }
        }
    }

    calculateContainerBounds() {
        const children = this.node.children;

        const firstChildBoundingBox = children[0].getComponent(UITransform).getBoundingBox();
        let bb = firstChildBoundingBox;
        let minX = Math.min(firstChildBoundingBox.xMin, 0),
            minY = Math.min(firstChildBoundingBox.yMin, 0),
            maxX = Math.max(firstChildBoundingBox.xMax, 0),
            maxY = Math.max(firstChildBoundingBox.yMax, 0);

        for (let i = 1; i < children.length; i++) {
            bb = children[i].getComponent(UITransform).getBoundingBox();
            // console.log(bb)
            minX = Math.min(minX, bb.xMin);
            minY = Math.min(minY, bb.yMin);
            maxX = Math.max(maxX, bb.xMax);
            maxY = Math.max(maxY, bb.yMax);
        }

        return { minX: minX, minY: minY, maxX: maxX, maxY: maxY, width: maxX - minX, height: maxY - minY };
    }

    resizeRefNodesIfTheirRenderOrdersAreAfterThisNode() {
        this.refNodes.forEach(refNode => {
            if (refNode.parent == this.node.parent) {
                const refNodeInd = refNode.parent.children.indexOf(refNode);

                if (refNodeInd > this.nodeInd) {

                    const responsivePluginOfRefNode = refNode.getComponent("Responsive2D");

                    if (responsivePluginOfRefNode) {
                        responsivePluginOfRefNode.resize();
                        if (responsivePluginOfRefNode.refNodes.includes(this.node)) {
                            console.warn(this.node.name + " and " + refNode.name + " nodes referance each other, this may result with awkward results!");
                        }
                    }
                }
            } else {
                console.warn(this.node.name + " and " + refNode.name + " have different parents!")
            }
        })
    }

    addEvents() {
        this.isEventsAdded = true;

        this.node.children.forEach(child => {
            child.on(Node.EventType.TRANSFORM_CHANGED, () => {
                this.oneTimeExecution = false;
            });

            child.on(Node.EventType.SIZE_CHANGED, () => {
                this.oneTimeExecution = false;
            })
        });

        this.node.on(Node.EventType.CHILD_ADDED, (e) => {

            e.on(Node.EventType.TRANSFORM_CHANGED, () => {
                this.oneTimeExecution = false;
            })
            e.on(Node.EventType.SIZE_CHANGED, () => {
                this.oneTimeExecution = false;
            })

            this.oneTimeExecution = false;
        })

        this.node.on(Node.EventType.CHILD_REMOVED, () => {
            this.oneTimeExecution = false;
        })
    }

    rotateUiCanvas() {
        if (this.rotateCanvas) {
            this.rotateCanvas = false;

            globalThis.rotateCanvas = !globalThis.rotateCanvas;
        }

        if (this.rotateCanvasPortrait) {
            this.rotateCanvasPortrait = false;

            globalThis.rotateCanvas = true;
        }

        if (this.rotateCanvasLandscape) {
            this.rotateCanvasLandscape = false;

            globalThis.rotateCanvas = false;
        }
    }

    switchDevice() {
        if (this.changeEditorDevice) {
            this.changeEditorDevice = false;

            globalThis.editorDeviceNo = (globalThis.editorDeviceNo + 1) % 3 + 1;
        }
    }

    update(deltaTime) {
        if (EDITOR) {
            this.resize();
            //console.log("UPDATE")
        } else {
            if (this.alignMode == 2) {
                this.resize();
            }
        }
    }
}

