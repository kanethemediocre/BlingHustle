module.exports = class Radio {
    constructor(intromessage){
        this.msgstart = 0; //Time that current message began
        this.sender = ""; //Who sent the message
        this.senderx = 420;//Math.floor(canvas.width/2) - Math.floor(this.sender.length/2);//not used?
        this.sendery = 600;
        this.msgnow = intromessage; //Text of message
        this.msgtime = Math.floor(this.msgnow.length*1.5) + 120; //message duration
        this.log = [];
        }
    newmsg(sndr, msg, thetime){//used to put a new message into the object
        this.msgstart = thetime;
        this.sender = sndr;
        this.senderx = Math.floor(canvas.width/2) - Math.floor(this.sender.length/2);
        this.msgnow = msg;
        this.msgtime = Math.floor(this.msgnow.length*1.5) + 120;
        this.log.push(this.msgnow);
        }
    display(thetime){
        if (thetime<(this.msgstart+this.msgtime)){			
            context.font='16px Courier New';
            context.fillStyle = "red";  
            context.fillText(this.sender+":",this.senderx,this.sendery);
            showmessage(this.msgnow.slice(0, (thetime-this.msgstart)*1 ));
            }
        }
    showlog(index,xpos,ypos){
        context.font = "12px Verdana";
        context.fillText(this.log.length+" entries",xpos,ypos-20);
        if (this.log.length>0){
        var logchart = [ this.log  ];
            var chartstart = 0;
            var chartend = this.log.length-1;
            if (this.log.length>8){
                chartstart = index - 4;
                chartend = index + 4;
                if (chartend < 8){chartend = 8;}
                if (chartstart<0){chartstart=0;}
                if (chartend>this.log.length-1){chartend=this.log.length-1;}
                }
            var logchart = [ this.log.slice(chartstart,chartend+1) ];
            //if (index>4){showchartabbrev(logchart, 64, 16, xpos,ypos, 80);}
            //else {showchartabbrev(logchart, 64, 16, xpos,ypos+, 80);}
            showchartabbrev(logchart, 64, 16, xpos,ypos, 80);
            fillwrappedtext(this.log[index],100,16,xpos,ypos+300);
            if ((this.log.length<8)||(index < 4)){
                context.fillText('X',xpos-16,ypos+index*16);
            }else{
                context.fillText('X',xpos-16,ypos+4*16);
                }
            }
        }
    }////end class radio