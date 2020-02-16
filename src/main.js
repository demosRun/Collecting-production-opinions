$(function () {
  $leader = $('#leader')
  $leader2 = $('#leader2')
})
var $leader = null;
var $leader2 = null;
var mdata = {};
var m_postfid;
var m_domianId; //
var m_subject;
var m_content;
var m_truename;
var m_linktel;
var m_fid; //
var leader;

// 设置分类
function setDomianId(val) {
  
  m_domianId = val;
  scrollIntoView()
}
// 选择省
// 选择省
function setProId(val) {
  var pid = val;
  //var localUrl = 'http://leaders.people.com.cn/liuyan_data/forum/forum_data_' + pid + '.jsonp';
  var localUrl = 'http://messageboard.peopletech.cn/forum_data_' + pid + '.jsonp';
  $.ajax({
    type: 'get',
    url: localUrl,
    cache: false,
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'IndexForum',
    async: false,
    success: function success(data) {
      leader = data;	  
      createLeader(leader, pid);
    },
    error: function error() {}
  });
  // scrollIntoView()
}

function createLeader(leader, pid) {
  $leader.html('');  
  var r = [];
  var lArr = leader[pid].childIds;

  var LEN = lArr.length;  
  //LEN = pid == 38 || pid == 39 ? 1 : 2;
  for (var i = 0; i < LEN; i++) {
    var oIndex = lArr[i];	
    var oLeader = leader[oIndex];
    r.push(oLeader);
  }

  var STR = '<option style="color: #b6b6b6" disabled selected>\u8BF7\u9009\u62E9</option>';
  for (var k = 0; k < r.length; k++) {
    var nowR = r[k];
    STR += '<option value="' + nowR.fid + '" topIds="' + nowR.topIds + '">' + nowR.name + '</option>';
  }
  $leader.html(STR);
}

function createLeader2(leader,pid) {
  $leader2.html('');  
  var r1 = [];
  var lArr1 = leader[pid].childIds;   
  if(lArr1 != null){
	  var LEN1 = lArr1.length;
	  //LEN = pid == 38 || pid == 39 ? 1 : 2;
	  for (var i = 0; i < LEN1; i++) {
		var oIndex1 = lArr1[i];
		var oLeader1 = leader[oIndex1];
		r1.push(oLeader1);
	  }
	
	  var STR1 = '<option style="color: #b6b6b6" disabled selected>\u8BF7\u9009\u62E9</option>';
	  for (var k1 = 0; k1 < r1.length; k1++) {
		var nowR1 = r1[k1];
		STR1 += '<option value="' + nowR1.fid + '" topIds="' + nowR1.topIds + '">' + nowR1.name + '</option>';
	  }
	  $leader2.html(STR1);
  }  
}

// 选择领导
function setLeaderId(val) {
  m_fid = val; 
  createLeader2(leader, val)
}

function setLeaderId1(val) {
  m_fid = val;
}

// 提交
function sub() {
  scrollIntoView()
  m_content = $('#mcontent').val();
  m_truename = $('#username').val();
  m_linktel = $('#tel').val();
  m_subject = $('#subject').val();
  m_code = parseInt($('#code').val());
  mdata = {
    topicId: 57,
    typeId: 5,
    domainId: m_domianId,
    Fid: m_fid,
    subject: m_subject,
    content: m_content + '#抗疫意见建议#',
    realName: m_truename,
    phone: m_linktel,
    varCode: m_code,
    position: 0
  };
  console.log(m_domianId , m_fid , m_subject , m_content , m_truename , m_linktel , m_code)
  if (m_domianId && m_fid && m_subject && m_content && m_truename && m_linktel && m_code) {
    $.ajax({
      type: 'post',
      url: 'http://liuyan.people.com.cn/topicThreads/huoDongPost',
      data: mdata,
      crossDomain: true,
      dataType: 'json',
      // jsonp: "callback",
      // jsonpCallback: "wangqizheng",
      success: function success(data) {
        if (data.result == 'success') {
          alert('提交留言成功！');
          $('#mcontent').val('');
          $('#username').val('');
          $('#tel').val('');
          $('#subject').val('');
          $('#code').val('');
        }
        var code = data.error;
        if (code == 'T0001') {
          alert('提交失败，您输入的信息不完整');
        } else if (code == 'T0002') {
          alert('提交失败，请确定您选择的留言版块是否正确');
        } else if (code == 'T0003' || code == 'T0004') {
          alert('提交失败，请确定您输入的分类或领域等信息是否正确');
        } else if (code == 'T0005') {
          alert('提交失败，您留言的话题活动已经结束');
        } else if (code == 'T0006') {
          alert('提交失败，请确定您的留言来源是否正确');
        } else if (code == 'T0007') {
          alert('提交失败，留言状态错误');
        } else if (code == 'T0008') {
          alert('提交失败，请检查留言标题是否符合要求');
        } else if (code == 'T0009') {
          alert('提交失败，请检查留言内容是否符合要求');
        } else if (code == 'T0010') {
          alert('提交失败，您输入的内容中包含了禁止词语');
        } else if (code == 'T0011') {
          alert('提交失败，请不要频繁发表留言');
        } else if (code == 'T0012') {
          alert('提交失败，您没有权限进行此操作');
        } else if (code == 'T0013') {
          alert('提交失败，您输入的验证码错误');
        }
      },
      error: function error(data) {}
    });
  } else {
    alert('请将表格填写完整');
  }
}

function scrollIntoView () {
  window.scrollTo(0, 0)
}
