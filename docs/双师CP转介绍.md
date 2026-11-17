# 双师CP转介绍

| 项目 | 内容 |
| --- | --- |
| 需求名称 | 双师CP转介绍 |
| 文档版本 | V1.0 |
| 文档日期 | 2026-10-29 |
| 目标终端 | CC、LP管台、移动端H5 |
| 需求状态 | 待评审 |
| UI | [https://www.figma.com/design/DZNXR7yxUmoW8V1CvcOQ5H/VIPKID%E5%8F%8C%E5%B8%88%E6%99%BA%E5%AD%A6?node-id=1185-325&p=f&t=JX9rHUaebEdfAGMl-0](https://www.figma.com/design/DZNXR7yxUmoW8V1CvcOQ5H/VIPKID%E5%8F%8C%E5%B8%88%E6%99%BA%E5%AD%A6?node-id=1185-325&p=f&t=JX9rHUaebEdfAGMl-0) |

## 1. 需求背景

双师智学需要建设线上转介绍闭环，将活动配置、邀请注册、关系归因、转化进度和奖励发放串联起来，减少线下登记与人工核对，提高运营、LP和CC的协同效率。

CC / LP需要在学生详情页生成专属转介绍海报，由家长A分享给家长B。家长B扫码后完成手机号验证和新老生判定，新生注册为K12账号，注册成功后展示CC二维码或兜底二维码。

家长A可直接进入H5，登录并选择正确学员，自主生成专属CP海报，保存或截图后发送给家长B；与CC / LP管台生成并行，后续注册、推荐绑定及奖励链路一致。

系统需要贯通人员、推荐人、被推荐人、活动和渠道的关联信息，在家长B完成指定试听或正课要求时，CC或LP为家长A发放京东卡密奖励，并保留可追溯的达标与发放记录。

## 2. 产品目标

1.  CC / LP可在管台学生A详情页点击“双师CP”，生成并复制专属海报。
    
2.  家长B扫码注册为K12账号；老生不进入本次新生注册成功流程。
    
3.  记录CC / LP与家长A、家长A与家长B的关系，支持活动与渠道归因。
    
4.  奖励可查询、可追溯，重复事件不重复发放。
    

## 3.核心流程

![mermaid-diagram (6).png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/41d9fe82-7837-44f1-9443-c39f8426f723.png)

# 4.功能描述

| 模块 | 功能 | 描述 | 示意图 |
| --- | --- | --- | --- |
| CC/LP管台 | 学生详情-双师CP | 1.  学生类型：K12账号<br>    <br>2.  只展示：~~（确认不展示：续费发圈、CP礼品卡）~~<br>    <br>    1.  LP：「双师CP」<br>        <br>    2.  CC：「双师CP」<br>        <br>3.  新增：「双师CP」入口，具体位置见原型<br>    <br>    1.  交互：点击生成跳转至预览海报页（与1V1逻辑一致）<br>        <br>    2.  选择家长：如果一个家庭下存在多个手机号，支持选择其中一个手机号（对应不同的家长ID）<br>        <br>    3.  支持右键复制海报<br>        <br>    4.  根据新海报ID，获取该海报ID对应的海报样式：业务提供<br>        <br>        1.  CC：FP2m9ejDyrQ<br>            <br>        2.  LP：Px9TQMesW40<br>            <br>    5.  生成海报二维码时，需要的一些参数<br>        <br>        1.  ac\[activityCode](https://activity.vipkid.com.cn/activity/newk12-friend-welfare/share?ac=fe00cc8b83c890ad&activityCode=fe00cc8b83c890ad&activityId=1430&activityPage=2&ck=3557210&codeTimeStamp=1793261936329&cpFrom=landing&pN=46235930&parentId=3557210&registerPage=2&staffId=57951711&staff_id=57951711&studentId=59549549&student_id=59549549&templateId=tQGYCmTJmFk&type=K12GBCP&_vts=2&tTraceId=9yb2)\=活动code<br>            <br>            1.  CC：2bc0e8d551a3070e<br>                <br>            2.   LP：daad11767a5bbc96<br>                <br>        2.  [activityId=](https://activity.vipkid.com.cn/activity/newk12-friend-welfare/share?ac=fe00cc8b83c890ad&activityCode=fe00cc8b83c890ad&activityId=1430&activityPage=2&ck=3557210&codeTimeStamp=1793261936329&cpFrom=landing&pN=46235930&parentId=3557210&registerPage=2&staffId=57951711&staff_id=57951711&studentId=59549549&student_id=59549549&templateId=tQGYCmTJmFk&type=K12GBCP&_vts=2&tTraceId=9yb2)1436<br>            <br>        3.  type<br>            <br>            1.  CC：K12CP<br>                <br>            2.  LP：LPK12CP<br>                <br>            3.  [https://management.vipkid.com.cn/ams/cp/activity](https://management.vipkid.com.cn/ams/cp/activity)<br>                <br>        4.  `student_id`：老生学生ID<br>            <br>        5.  `parent_id`：老生家长ID<br>            <br>        6.  `staff_id`：老生CC/LP staff ID<br>            <br>        7.  渠道ID：CC、LP各一个（不确定是否是放在海报链接里的，需要研发确认，后续需要根据渠道ID进行分配）<br>            <br>            1.  14775212<br>                <br>            2.  14775213<br>                <br>        8.  本次不需要支持换肤功能，所以不需要[activityPage=2](https://activity.vipkid.com.cn/activity/newk12-friend-welfare/share?ac=fe00cc8b83c890ad&activityCode=fe00cc8b83c890ad&activityId=1430&activityPage=2&ck=3557210&codeTimeStamp=1793261936329&cpFrom=landing&pN=46235930&parentId=3557210&registerPage=2&staffId=57951711&staff_id=57951711&studentId=59549549&student_id=59549549&templateId=tQGYCmTJmFk&type=K12GBCP&_vts=2&tTraceId=9yb2)\\_vts，需要研发确认是否会有什么影响<br>            <br>4.  参考1V1二维码对应的链接：[https://activity.vipkid.com.cn/activity/newk12-friend-welfare/share?ac=fe00cc8b83c890ad&activityCode=fe00cc8b83c890ad&activityId=1430&activityPage=2&ck=3557210&codeTimeStamp=1793261936329&cpFrom=landing&pN=46235930&parentId=3557210&registerPage=2&staffId=57951711&staff\_id=57951711&studentId=59549549&student\_id=59549549&templateId=tQGYCmTJmFk&type=K12GBCP&\_vts=2&tTraceId=9yb2](https://activity.vipkid.com.cn/activity/newk12-friend-welfare/share?ac=fe00cc8b83c890ad&activityCode=fe00cc8b83c890ad&activityId=1430&activityPage=2&ck=3557210&codeTimeStamp=1793261936329&cpFrom=landing&pN=46235930&parentId=3557210&registerPage=2&staffId=57951711&staff_id=57951711&studentId=59549549&student_id=59549549&templateId=tQGYCmTJmFk&type=K12GBCP&_vts=2&tTraceId=9yb2)<br>    <br>5.  转介绍关系列表：同1V1<br>    <br>    1.  LP：展示我邀请的全部用户；字段包含被推荐人手机号、注册时间、试听状态、报名状态、奖励状态；（同1V1） | ![Group 4.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/0a83c93a-b665-4f4b-8a51-812f52d7c1c8.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/a8df2da2-97f1-4691-84a6-15d9ff795155.png)<br>![Group 2.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/fe8fe9a8-68e6-4b7d-9fe8-733f45cb549c.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/07255a35-4b6c-45c2-b920-1a633812300e.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/X3lE8GK9dgJEgOJb/img/e733f79f-d927-4a57-8362-b96ccc959f4c.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/49e48f6f-2e38-49c6-822c-5c0e21ce0290.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/48dd6d7f-6601-4f3e-828e-4de1b7a6d49b.png) |
| 企微-双师侧边栏 | cp 海报入口 | 侧边栏模块展示逻辑修改：<br>1.  陈月及同级架构，且学生类型为 K12：展示【双师智学】侧边栏<br>    <br>2.  社群 CC 及同级架构，且学生类型为 K12：展示【双师智学】侧边栏（整个侧边栏仅保留本次新增的 CP海报标签）<br>    <br>一级 tab 文案变更：【报告/物料/CP】<br>二级标签新增一项：【CP 海报】（默认展示该项）<br>切到【CP 海报】标签后展示海报模版+交互按钮<br>点击【预览并发送】：弹出预览弹窗，生成海报内容，将生成好的海报贴至聊天输入框，（整个交互流程可参考复用 1v1）<br>海报 ID 配置&海报生成逻辑：同上 CC/LP 管台一致：<br>1.  企微使用人为 CC 角色：展示CC-海报 ID<br>    <br>2.  企微使用人为 LP 角色：展示LP-海报 ID<br>    <br>埋点：<br>event\_id：click\_weCom\_cpPoster\_previewSendButton<br>次数，人数，点击角色（CC/LP） | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/939ada22-d926-4ce3-9e7d-5231e770b19b.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/0eb8fb87-2dbf-4aaa-bae9-082259f6d302.png) |
| 生成海报H5页 |  | 1.  未登录<br>    <br>    1.  默认文案：您的海报正在制作中...<br>        <br>    2.  登录按钮<br>        <br>        1.  文案：请先选择学生生成海报<br>            <br>        2.  交互：点击后，弹出手机号登录框<br>            <br>        3.  手机号：必填<br>            <br>        4.  默认文案：请输入手机号码<br>            <br>        5.  获取验证码：默认文案“请输入短信验证码”<br>            <br>            1.  未填写手机号，「获取验证码」置灰<br>                <br>            2.  已填写手机号，「获取验证码」高亮可点，校验手机号格式<br>                <br>            3.  格式正确，发送验证码，60s倒计时<br>                <br>            4.  格式错误， toast提示“请输入正确手机号”<br>                <br>        6.  按钮：立即登录<br>            <br>            1.  验证码错误：点击「立即登录」，toast提示“请输入正确验证码”<br>                <br>            2.  验证码正确：点击「立即登录」，走登录流程<br>                <br>        7.  协议与隐私说明：必选，内容与优学App的隐私政策保持一致<br>            <br>            1.  未勾选：toast提示“请同意隐私政策”<br>                <br>            2.  已勾选：走登录流程<br>                <br>2.  已登录<br>    <br>    1.  登录后，判断是否存在K12类型(bizy\_type=0)的学生<br>        <br>        1.  不存在：展示兜底页面“不符合活动条件”<br>            <br>        2.  存在：走下述逻辑<br>            <br>    2.  在首次登录后，默认展示选择**K12学生**抽屉（可能是一个，或多个）（与1V1不同的是需要过滤学生类型为K12，bizy\_type=0）<br>        <br>        1.  存在1个K12：默认选中该K12学生，不需要展示出选择学生抽屉<br>            <br>        2.  存在多个K12：<br>            <br>            1.  展开选择学生抽屉，不默认选中任何一个学生<br>                <br>            2.  学生列表：仅需将1V1学生列表过滤掉「成人」、「G标」类型学生即可<br>                <br>            3.  选中学生后，收起抽屉，生成CP海报（生成逻辑同上）<br>                <br>    3.  底部默认文案<br>        <br>        1.  01 请先选择正确的学员账号再分享，可点击页面右上角**【切换学生】**重新选择。<br>            <br>        2.  02 **【请长按保存海报】**或**【截图发给好友】**  <br>            好友扫码即可参与活动<br>            <br>        <br>        温馨提醒（直接转发此页面无法识别哦）<br>        <br>    4.  切换孩子：右上角常驻，点击后，展示选择学生抽屉，同上（可能是一个，或多个）<br>        <br>3.  1104新增：需要区分渠道，CC和LP使用不同渠道的落地页<br>    <br>    1.  CC：14775212<br>        <br>    2.  LP：14775213<br>        <br>4.  异常情况：海报生成失败，展示兜底页面<br>    <br>    1.  海报生成失败，请重试<br>        <br>    2.  「重试」按钮：点击后，刷新页面，重新生成海报<br>        <br>5.  逻辑参考：[https://mobile.vipkid.com.cn/parentsspeedy/extend/tanmaposter](https://mobile.vipkid.com.cn/parentsspeedy/extend/tanmaposter) | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/7eee89b4-a7e2-4439-822f-bebec654373e.png)![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/b9110a28-c39d-436d-8da5-b97def795cca.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/c33ec8e6-d4cc-4fab-acd5-bc8724e00a66.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/e967d5c0-5eb6-4392-915b-839fb8fbfeb5.png)<br>![Group 5.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/8e330922-8d18-43f4-932b-37569d8dd51c.png) |
| 注册落地页 |  | 1.  手机号：必填<br>    <br>    1.  默认文案：请输入手机号码<br>        <br>2.  获取验证码：默认文案“请输入短信验证码”<br>    <br>    1.  未填写手机号，获取验证码置灰<br>        <br>    2.  已填写手机号，获取验证码高亮可点，校验手机号格式<br>        <br>        1.  格式正确后发送，60s倒计时，防重复发送<br>            <br>        2.  格式错误， toast提示“请输入正确手机号”<br>            <br>3.  孩子年龄：必填，同1V1，默认文案“请选择孩子年龄”<br>    <br>    1.  年龄区间同1V1，见右截图<br>        <br>4.  《用户服务协议》、《隐私协议》、《儿童隐私协议》：必选，内容与优学App的隐私政策保持一致<br>    <br>    1.  未勾选：toast提示“请同意隐私政策”<br>        <br>    2.  已勾选：正常走下面的流程<br>        <br>5.  倒计时：统一6分钟倒计时，每次进入注册落地页时，开始6分钟倒计时<br>    <br>6.  0元领取体验课<br>    <br>    1.  验证码错误：点击「0元领取英语体验礼包」，toast提示“请输入正确验证码”<br>        <br>    2.  验证码正确：点击「0元领取英语体验礼包」，走底层注册登录接口<br>        <br>        1.  UC统一逻辑：如果家庭下有社群学生，就不创建K12，如果没有就创建K12，社群学生定义：注册渠道是社群类型，或者有优学绑定关系<br>            <br>    3.  ~~11-10修改~~<br>        <br>        1.  ~~手机号对应的家庭下，无「成人」或「G标」账号~~<br>            <br>            1.  ~~无K12，~~~~**注册为K12账号，与推荐人绑定转介绍关系，**~~~~并跳转至注册结果页~~<br>                <br>            2.  ~~有K12，不再重新创建K12，走登录流程，跳转到领取失败页面~~<br>                <br>        2.  ~~手机号对应的家庭下，存在「成人」或「G标」账号，不创建K12账号，跳转领取失败页面~~<br>            <br>7.  规则说明：常驻入口，点击后弹出说明弹窗<br>    <br>    1.  [《双师智学转介绍活动规则》](https://alidocs.dingtalk.com/i/nodes/dpYLaezmVNLRQ1AbUN69dMQx8rMqPxX6?utm_source=im&utm_scene=person_space&iframeQuery=utm_medium%3Dim_card%26utm_source%3Dim&utm_medium=im_card&corpId=ding462f88150396cb78)<br>        <br>8.  逻辑参考：[https://activity.vipkid.com.cn/activity/newk12-friend-welfare/share?ac=fe00cc8b83c890ad&activityCode=fe00cc8b83c890ad&activityId=1430&activityPage=2&ck=3557210&codeTimeStamp=1793261936329&cpFrom=landing&pN=46235930&parentId=3557210&registerPage=2&staffId=57951711&staff\_id=57951711&studentId=59549549&student\_id=59549549&templateId=tQGYCmTJmFk&type=K12GBCP&\_vts=2&tTraceId=9yb2](https://activity.vipkid.com.cn/activity/newk12-friend-welfare/share?ac=fe00cc8b83c890ad&activityCode=fe00cc8b83c890ad&activityId=1430&activityPage=2&ck=3557210&codeTimeStamp=1793261936329&cpFrom=landing&pN=46235930&parentId=3557210&registerPage=2&staffId=57951711&staff_id=57951711&studentId=59549549&student_id=59549549&templateId=tQGYCmTJmFk&type=K12GBCP&_vts=2&tTraceId=9yb2) | ![Group 7.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/eaf4f303-e0fe-42d2-b899-ac373fbb231c.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/35a11e03-22db-45b2-ae59-cb27d30018ab.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/0fcc4f95-89ab-4854-8f05-91497193a3e3.png) |
| 注册结果页 |  | 1.  新生注册：跳转至注册成功页<br>    <br>    1.  领取成功<br>        <br>    2.  主标题：扫码添加课程老师<br>        <br>    3.  副标题<br>        <br>        1.  获取上课方式<br>            <br>        2.  领取学习资料<br>            <br>        3.  1V1贴心服务<br>            <br>    4.  CC二维码<br>        <br>        1.  有归属CC：展示归属CC二维码<br>            <br>        2.  无归属CC：展示兜底二维码，staff ID：8741525 -谢嘉麟<br>            <br>        3.  ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/X3lE8GK9dgJEgOJb/img/491b8099-b609-468b-8587-f92f2e17cd31.png)<br>            <br>    5.  请截图保存，去微信扫码<br>        <br>2.  老生登录：跳转至领取失败页<br>    <br>    1.  主标题：很遗憾！领取失败<br>        <br>    2.  正文：<br>        <br>你好，老朋友～<br>你已经注册过会员，无法领取新用户的权益。 | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/ba3b888a-0694-4774-81bb-9060cf005fb5.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/a0c5fec2-121d-448b-9d7c-c645466a6ea5.png) |
| 奖励机制 |  | 1.  完课奖励：被推荐人累计完成**3节双师试听课**，触发发送奖励，根据绑定的活动ID，活动ID绑定的礼品，进行发送（本期是虚拟物品，由LP手动赠送）<br>    <br>    1.   course ID：101551412<br>        <br>    2.  11-10新增：<br>        <br>        1.  完课时间段限制：上线后-2026年12月31日<br>            <br>    3.  在上述时间段内，累计消耗3课时即可<br>        <br>2.  付费奖励：被推荐人**付费正价**双师课，并**完课10节正价课**，触发发送奖励<br>    <br>    1.  course ID：100031822<br>        <br>    2.  11-10新增：<br>        <br>        1.  付费时间段、完课时间段限制：上线后-2026年12月31日<br>            <br>    3.  在上述时间段付费，并累计消耗10课时即可<br>        <br>3.  新生注册后，传课包ID（专属ID），进行植课，进入对应的营期，课包ID：[34508](http://admin-order.vipkid.com.cn/sku/coursepack/coursesearch/34508)、34573<br>    <br>4.  1V1侧需修改：K12学生类型，不触发结果激励 |  |
| 激活逻辑 |  | 1.  天然支持的逻辑，但是需要测试回归一下，确保没有问题<br>    <br>    1.  当前结算渠道是R，已过期，能存进新推荐关系，老推荐关系失效<br>        <br>    2.  结算渠道当前是S，已过期，结算渠道变成r，存推荐关系 |  |

## 5. 埋点需求

**H5海报生成页**

| event\_id | event | 埋点说明 | 参数（除统一参数外） | 示意图 |
| --- | --- | --- | --- | --- |
| `cp_poster_page_view` | `$pageview` | 海报生成页曝光 |  | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/7eee89b4-a7e2-4439-822f-bebec654373e.png) |
| `cp_poster_select_student_click` | `page_click_viptrack` | 点击“请先选择学生生成海报” |  |
|  |  |  |  |  |
| `cp_poster_login_popup_view` | `$pageview` | 验证码登录弹窗曝光 |  | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/b9110a28-c39d-436d-8da5-b97def795cca.png) |
| `cp_poster_login_input_click` | `page_click_viptrack` | 点击登录弹窗输入框，首次聚焦时记录 |  |
| `cp_poster_login_sms_click` | `page_click_viptrack` | 点击可用的“获取验证码” |  |
| `cp_poster_login_sms_result` | `page_trigger_viptrack` | 登录验证码发送结果返回 | `result`<br>0=成功<br>1=失败 |
| `cp_poster_login_agreement_click` | `page_click_viptrack` | 切换登录协议勾选状态 |  |
| `cp_poster_login_protocol_click` | `page_click_viptrack` | 点击协议链接 |  |
| `cp_poster_login_submit_click` | `page_click_viptrack` | 点击“立即登录” |  |
| `cp_poster_login_result` | `page_trigger_viptrack` | 登录成功或失败 | `result`<br>0=成功<br>1=失败 |
| `cp_poster_login_popup_close` | `page_click_viptrack` | 主动关闭登录弹窗 |  |
| `cp_poster_student_popup_view` | `$pageview` | 学员选择弹窗曝光 |  | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/c33ec8e6-d4cc-4fab-acd5-bc8724e00a66.png) |
| `cp_poster_student_select_click` | `page_click_viptrack` | 点击选择某个学员 |  |
| `cp_poster_student_popup_close` | `page_click_viptrack` | 主动关闭学员选择弹窗；存在时记录 |  |
| `cp_poster_switch_student_click` | `page_click_viptrack` | 点击“切换学生” |  | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/e967d5c0-5eb6-4392-915b-839fb8fbfeb5.png)<br>![Group 5.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/b4e1cbed-31d9-427a-8bb3-ad5270a4c701.png) |
| `cp_poster_generate_trigger` | `page_trigger_viptrack` | 确认学员后实际发起海报生成 |  |
| `cp_poster_generate_result` | `page_trigger_viptrack` | 海报生成成功或失败 | `result`<br>0=成功<br>1=失败 |
| `cp_poster_retry_click` | `page_click_viptrack` | 点击重试 |  |
| `cp_poster_longpress_trigger` | `page_trigger_viptrack` | 检测到海报长按 |  |

**好友注册落地页**

| event\_id | event | 埋点说明 | 参数（除统一参数外） | 示意图 |
| --- | --- | --- | --- | --- |
| `cp_register_page_view` | `$pageview` | 好友注册落地页曝光 |  | ![Group 7.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/eaf4f303-e0fe-42d2-b899-ac373fbb231c.png) |
| `cp_register_rules_click` | `page_click_viptrack` | 点击“活动规则” |  |
| `cp_register_rules_popup_view` | `$pageview` | 活动规则弹窗曝光 |  | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/31fdb706-76f3-45eb-be39-456647305cae.png) |
| `cp_register_rules_close_click` | `page_click_viptrack` | 主动关闭规则弹窗 |  |
| `cp_register_phone_click` | `page_click_viptrack` | 手机号输入框首次聚焦 |  | ![Group 7.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/eaf4f303-e0fe-42d2-b899-ac373fbb231c.png) |
| `cp_register_submit_click` | `page_click_viptrack` | 点击“0元领取体验课” |  |
| `cp_register_sms_input_click` | `page_click_viptrack` | 验证码输入框首次聚焦 |  |
| `cp_register_sms_click` | `page_click_viptrack` | 点击可用的“获取验证码” |  |
| `cp_register_sms_result` | `page_trigger_viptrack` | 验证码发送结果返回 |  |
| `cp_register_sms_countdown_end` | `page_trigger_viptrack` | 验证码倒计时结束，可重新获取 |  |
| `cp_register_age_open_click` | `page_click_viptrack` | 点击“请选择孩子年龄” |  |
| `cp_register_age_popup_view` | `$pageview` | 年龄选择面板曝光 |  | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/54e439ae-1604-4cd0-8a51-63d3e1448b8d.png) |
| `cp_register_age_select_click` | `page_click_viptrack` | 点击年龄选项 | content=选择的年龄 |
| `cp_register_age_cancel_click` | `page_click_viptrack` | 关闭年龄面板 |  |
| `cp_register_agreement_click` | `page_click_viptrack` | 切换隐私协议勾选状态 |  | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/ec4acda4-19bc-40f3-905d-0b78b3503726.png) |
| `cp_register_protocol_click` | `page_click_viptrack` | 点击协议链接 | content=协议类型 |
| `cp_register_result` | `page_trigger_viptrack` | 注册结果返回 | `result=`<br>0=成功<br>1=失败 | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/ba3b888a-0694-4774-81bb-9060cf005fb5.png) |
| `cp_register_old_user_popup_view` | `$pageview` | “老朋友”页面曝光 |  | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/a0c5fec2-121d-448b-9d7c-c645466a6ea5.png) |
| `cp_register_success_view` | `$pageview` | 注册成功结果页曝光 |  | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/d6l235RXwK6jMn7M/img/ba3b888a-0694-4774-81bb-9060cf005fb5.png) |