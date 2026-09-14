# VIPKID 优学个人中心——课时与订单

| 项目 | 内容 |
| --- | --- |
| 产品名称 | VIPKID 优学 |
| 需求名称 | 个人中心课时与订单能力 |
| 文档版本 | V1.0 |
| 文档日期 | 2026-08-24 |
| 目标终端 | 手机&pad 横屏 |
| 需求状态 | 待评审 |
| 原型 | [https://jiangshuang12345-tech.github.io/youxue-app/#orders](https://jiangshuang12345-tech.github.io/youxue-app/#orders) |
| UI | [https://www.figma.com/design/seFwQ9gZIdtvAd0gAxDIcI/VIPKID-%E4%BC%98%E5%AD%A6?node-id=32896-2774&p=f&m=dev](https://www.figma.com/design/seFwQ9gZIdtvAd0gAxDIcI/VIPKID-%E4%BC%98%E5%AD%A6?node-id=32896-2774&p=f&m=dev) |

## 1. 需求背景

当前个人中心主要展示用户信息、学习数据与会员权益，**缺少课时资产和订单记录**的集中查询入口。用户无法快速确认剩余课时、课时有效期、课时获得与消耗明细，也无法在应用内统一查看购买订单及订单详情。

部分用户在CC提供的支付二维码，扫码支付时，**感到无信任感**，所以希望针对这部分用户，依托于app增加支付二维码展示的入口

本需求在个人中心新增“我的课时”和“我的订单”两个入口，建立从资产概览到明细追溯的完整查询链路。所有页面以 手机 &pad 横屏为主要展示形态。

## 2. 产品目标

1.  用户可在个人中心一键进入我的课时与我的订单。
    
2.  用户可明确查看不同课时类型的剩余数量和有效期。
    
3.  用户可追溯课时包批次，以及每次课时获得和消耗记录。
    
4.  用户可按状态查看订单，并进入单笔订单详情。
    
5.  用户可查看微信、支付宝的支付二维码，并保存
    
6.  横屏页面在一个视口内优先展示核心信息，列表区域独立滚动。
    

## 3. 非目标

*   本期不支持购买课程或课时。
    
*   本期支持待支付订单，展示支付二维码。
    
*   本期不支持主动发起退款申请。
    
*   本期不支持开票与协议下载
    
*   本期不支持修改课时有效期或人工调整课时。
    
*   本期不包含后台运营配置能力。
    

## 4. 用户角色与使用场景

### 4.1 用户角色

*   已登录家长用户：查看孩子名下课时资产及购买订单。
    

### 4.2 核心场景

*   家长上课前确认剩余课时是否充足。
    
*   家长确认课时包何时到期，合理安排上课计划。
    
*   家长核对某笔课时是购买、赠送还是上课消耗。
    
*   家长确认订单是否支付成功、完成、退款或仍在处理中。
    
*   家长根据订单编号、时间和金额与客服沟通。
    
*   家长在支付时，认为CC提供的支付二维码无信任感
    

## 5. 信息架构

```text
个人中心
├── 我的课时
│   ├── 课时类型列表
│   ├── 有效期详情
│   └── 剩余课时明细
│       ├── 全部
│       ├── 获得
│       │   ├── 全部获得
│       │   ├── 购买获得
│       │   └── 赠送获得
│       └── 消耗
└── 我的订单
    ├── 全部订单
    ├── 待支付
    │    ├──取消订单
    │    ├──微信支付
    │    ├──支付宝支付
    ├── 已完成
    ├── 处理中
    ├── 已退款
    ├── 订单详情
    │    ├──取消订单
    │    ├──微信支付
    └──  └──支付宝支付
```

## 6. 页面需求

### 6.1 个人中心

| 模块 | 功能 | 描述 | 示意图 |
| --- | --- | --- | --- |
| 个人中心 | 我的课时 | 1.  新增常驻入口：「我的课时」<br>    <br>    1.  位置：放到第一位<br>        <br>    2.  入口点击热区应覆盖图标与文案整体。<br>        <br>2.  交互：<br>    <br>    1.  点击后，进入课时列表 | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/ada9a91f-a072-413f-b439-967dd0a2ed0d.png) |
|  | 我的订单 | 1.  新增常驻入口：我的订单<br>    <br>    1.  位置：放到「我的课时」入口后<br>        <br>    2.  入口点击热区应覆盖图标与文案整体。<br>        <br>2.  交互：点击后，进入订单列表 |
|  | 账号管理 | 位置挪到「我的订单」后面 |

### 6.2 我的课时

| 模块 | 功能 | 描述 | 示意图 |
| --- | --- | --- | --- |
| 我的课时 | 课时列表 | 1.  数据范围：1V1家长端app内，「我的课时」部分，只保留两个course ID的数据（100031822、101551412）<br>    <br>2.  课时类型<br>    <br>    1.  双师智学课时。course ID：100031822<br>        <br>    2.  双师智学体验课时。course ID：101551412<br>        <br>3.  按课时类型展示<br>    <br>4.  页面结构<br>    <br>    1.  顶部：<br>        <br>        1.  返回按钮<br>            <br>        2.  顶部title：我的课时<br>            <br>    2.  课时列表：每种课时类型一张横版卡片。<br>        <br>    3.  底部：课时到期提示，固定文案：“**课时将在有效期结束后自动失效，请合理安排学习时间**”<br>        <br>5.  字段<br>    <br>    1.  课时类型：文本<br>        <br>        1.  双师智学课<br>            <br>        2.  双师智学体验课<br>            <br>    2.  剩余课时：非负整数<br>        <br>        1.  当前可用数量：有效期内的课时总数<br>            <br>    3.  有效期：`YYYY-MM-DD HH:mm:ss`<br>        <br>        1.  同1v1家长端内的计算逻辑<br>            <br>        2.  当前课时类型，已激活订单中，剩余课时不为0的（也就是正在消耗的那笔订单中）包含的课时的有效期到期时间<br>            <br>        3.  例：<br>            <br>            1.  用户名下，双师智学课时，分为三笔订单购买<br>                <br>                1.  第一笔订单包含50课时<br>                    <br>                2.  第二笔订单包含50课时<br>                    <br>                3.  第三笔订单包含50课时<br>                    <br>                4.  共计150课时<br>                    <br>            2.  当前共剩余70课时<br>                <br>            3.  第一笔订单的50课时先消耗，课时先被激活，有效期至2027/08/25，**剩余0课时**<br>                <br>            4.  第二笔订单，再次开始消耗，已激活，有效期至2027/09/25，**剩余20课时**<br>                <br>            5.  第三笔订单，未激活，**剩余50课时**<br>                <br>            6.  这个时候，展示的有效期截止时间为「2027/09/25」（第二笔订单包含的课时有效期到期时间）<br>                <br>6.  交互：0902修改<br>    <br>    1.  点击整个卡片进入「课时详情」~~进入该课时类型的「有效期详情」。~~<br>        <br>    2.  ~~点击「课时数字」、「剩余课时」或「右侧箭头」进入「剩余课时明细」。~~<br>        <br>    3.  点击返回按钮回到「个人中心」。<br>        <br>7.  无数据时，兜底文案“**“暂无课时”**” | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/3755ff03-ebf3-4347-9b84-089e7eee6eb4.png) |

### 6.3 课时详情

| 模块 | 功能 | 描述 | 示意图 |
| --- | --- | --- | --- |
| 0902修改：课程详情 | 列表 | 默认「课时记录」tab，可切换至「有效期详情」tab | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/25b17adc-aec3-4e51-b462-433336534da7.png) |
| 有效期详情 | 有效期列表 | 1.  排列顺序：<br>    <br>    1.  已激活>未激活<br>        <br>*   **已激活批次：**按有效期从近到远排序。（正常情况下，只有一笔订单是已激活状态）<br>    <br>*   **未激活批次**：按成功购买日期从早到晚排序。<br>    <br>1.  字段<br>    <br>    1.  激活状态：已激活、未激活（逻辑通1V1家长端App）<br>        <br>    2.  剩余课时<br>        <br>    3.  购课日期：订单支付时间<br>        <br>    4.  有效期：<br>        <br>        1.  未激活时：展示“激活后计算有效期”<br>            <br>        2.  已激活时：展示到期时间`YYYY-MM-DD HH:mm:ss`<br>            <br>    5.  订单编号<br>        <br>    6.  订单备注：如购买课程包、其他原因获赠课时（逻辑通1V1家长端App）<br>        <br>    7.  不支持手动延长有效期 | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/2d94b1d4-c9b3-43c0-bec2-e5a1fabc0b0a.png) |

### 6.4 剩余课时明细   0902修改：课时记录

| 模块 | 功能 | 描述 | 示意图 |
| --- | --- | --- | --- |
| ~~剩余课时明细~~<br>课时记录 | 列表 | 1.  页面布局：筛选栏与流水列表，列表独立滚动<br>    <br>2.  一级筛选<br>    <br>    1.  全部：所有获得与消耗记录<br>        <br>    2.  获得：仅正向课时记录<br>        <br>    3.  消耗：仅负向课时记录<br>        <br>3.  二级筛选：仅当一级筛选为“获得”时展示：同1V1家长端<br>    <br>    1.  全部获得<br>        <br>    2.  购买获得<br>        <br>    3.  赠送获得<br>        <br>4.  字段<br>    <br>    1.  月份分组：获得/消耗的月份<br>        <br>    2.  流水标题：同1V1家长端App<br>        <br>    3.  发生日期：消耗or获得的时间<br>        <br>    4.  课时变化量：获得显示 `+N`，消耗显示 `−N`<br>        <br>    5.  订单编号<br>        <br>5.  状态规则<br>    <br>    1.  切换一级筛选后，列表回到顶部。<br>        <br>    2.  离开“获得”后隐藏二级筛选。<br>        <br>    3.  无数据时展示“当前筛选下暂无课时记录”。 | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4j6OJ5PZ7PwkDq3p/img/2f05985a-aba0-481f-bbd6-4a52e35d40ee.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4j6OJ5PZ7PwkDq3p/img/f2e45f6b-934c-4281-b125-ed2d0e256ea7.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4j6OJ5PZ7PwkDq3p/img/f679437d-27cc-4245-b527-f786c126ce6f.png) |

### 6.5 我的订单

| 模块 | 功能 | 描述 | 示意图 |
| --- | --- | --- | --- |
| 我的订单 | 订单列表 | 1.  数据范围：1V1家长端内的「我的订单」部分，只保留两个course ID的数据（100031822、101551412）<br>    <br>2.  布局<br>    <br>    1.  左栏：订单状态导航<br>        <br>    2.  右栏：双列订单卡片列表，区域独立滚动<br>        <br>3.  状态筛选（同1V1）<br>    <br>    1.  全部订单：展示全部订单<br>        <br>    2.  待支付：已创建订单，未完成支付的订单<br>        <br>    3.  已完成：已支付完成的订单<br>        <br>    4.  处理中：退费中的订单<br>        <br>    5.  已费款：已完成退费的订单<br>        <br>4.  订单卡片字段（同1V1）<br>    <br>    1.  ~~购买人头像和名称。~~<br>        <br>    2.  订单状态。<br>        <br>    3.  课包名称。<br>        <br>    4.  课程名称。<br>        <br>    5.  商品数量。（课时数量）<br>        <br>    6.  实付金额。<br>        <br>    7.  “查看详情”提示。<br>        <br>5.  交互<br>    <br>    1.  点击左侧状态后，右侧列表即时刷新，选中状态高亮。<br>        <br>    2.  点击订单卡片任意区域，进入订单详情。<br>        <br>    3.  待支付状态的订单卡片<br>        <br>        1.  展示「取消订单」按钮；<br>            <br>            1.  点击后，弹出二次确认<br>                <br>                1.  主标题：确认取消订单？<br>                    <br>                2.  副标题：取消后该订单将无法继续支付，请确认是否取消。<br>                    <br>                3.  按钮：<br>                    <br>                    1.  暂不取消：关闭弹窗，停留在当前页面<br>                        <br>                    2.  确认取消：确认成功后，停留在列表并刷新状态。<br>                        <br>        2.  展示「微信支付」&「支付宝」按钮（支付二维码生成规则同CC管台：[https://cc.management.vipkid.com.cn/new/leads/61107205](https://cc.management.vipkid.com.cn/new/leads/61107205)）<br>            <br>            1.  点击后，分别弹出对应渠道的支付二维码弹窗<br>                <br>            2.  支付二维码弹窗，展示<br>                <br>                1.  支付方式<br>                    <br>                2.  应付金额<br>                    <br>                3.  二维码<br>                    <br>                4.  「保存二维码」按钮：点击后，走相册权限逻辑（见下详述）<br>                    <br>                5.  支持长按扫码功能<br>                    <br>                6.  操作说明（常驻）：<br>                    <br>                    1.  微信：**可长按扫码，或保存二维码后打开微信，使用“扫一扫—从相册选择”完成支付**<br>                        <br>                    2.  支付宝：**可长按扫码，或保存二维码后打开支付宝，使用“扫一扫—从相册选择”完成支付**<br>                        <br>                    <br>                7.  关闭按钮：点击遮罩或点右上角关闭按钮，可关闭<br>                    <br>*   无数据时展示：**“暂无订单”**。 | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/e982eddd-dd08-485e-96f1-905c8578bcee.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4j6OJ5PZ7PwkDq3p/img/845de28f-e5d5-470d-a3cd-8d2bf42fef57.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/cf6a880e-fecc-4e46-a51a-8fd20fdb78f6.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/6a46f12c-72a9-4e53-a14a-cce31b6c299f.png) |
|  | 相册权限逻辑 | 1.  首次流程<br>    <br>1.  用户点击“保存二维码”按钮。<br>    <br>2.  页面检查订单仍为「待支付」状态，否则不发起权限申请。toast提示“**订单状态变更，请刷新后重试**”<br>    <br>3.  客户端查询相册“仅添加”权限状态。<br>    <br>4.  状态为「未获取」时，调用系统权限弹窗，文案：<br>    <br>    1.  ~~主标题：~~~~**“优学App”想添加照片**~~<br>        <br>    2.  ~~副标题：~~~~**用于将支付二维码保存到相册，方便前往微信或支付宝扫码支付。**~~**0904修改，复用原来的文案：**<br>        <br>        1.  **允许“VIPKID优学”访问照片图库；**<br>            <br>        2.  **需要访问相册**<br>            <br>    3.  **按钮**<br>        <br>        1.  **允许完全访问：**客户端将当前渠道二维码保存至系统相册<br>            <br>            1.  **保存成功后**，在操作说明下方，展示提示文案：<br>                <br>                1.  微信&支付宝：**二维码图片已保存，请查看系统下载内容**<br>                    <br>        2.  **不允许：弹窗**<br>            <br>            1.  主标题：`**无法保存二维码**`<br>                <br>            2.  副标题：`**请在系统设置中允许优学App添加照片，以便保存支付二维码。**`<br>                <br>            3.  次按钮：`暂不保存`，关闭引导弹窗，并停留在支付二维码弹窗，并在操作说明下方，提示“**未获得相册权限，暂时无法保存**”<br>                <br>            4.  主按钮：`去设置`，跳转至“系统设置 > 优学App > 照片”。<br>                <br>            5.  用户从系统设置返回App后，客户端在App恢复前台时，重新查询权限<br>                <br>                1.  若已授权，停留在原支付二维码弹窗，并提示“**权限已开启，请点击保存二维码**”，不自动保存，避免用户离开期间订单已经在其他渠道已支付，状态变更。<br>                    <br>                2.  若仍为拒绝状态，不重复弹窗；用户再次点击「保存二维码」时，再次展示引导弹窗。<br>                    <br>5.  **权限申请规则**<br>    <br>*   仅申请“向照片图库添加图片”所需的最小权限，不申请读取用户全部照片的权限。<br>    <br>*   不在App启动、进入订单页或打开支付弹窗时提前申请权限；仅在用户主动点击“保存二维码”时按需申请。<br>    <br>*   权限申请期间保持支付弹窗展示，按钮进入加载态「**正在申请权限…**」，不可点击；弹窗「关闭按钮」可点击<br>    <br>1.  **保存结果交互**<br>    <br>    1.  保存成功：Toast：`**二维码已保存到相册**`；支付弹窗保持打开；按钮恢复可点击<br>        <br>    2.  权限被拒绝：展示“无法保存二维码”引导弹窗；不得显示成功Toast<br>        <br>    3.  二维码生成失败：Toast：`**二维码生成失败，请重试**`；按钮恢复可点击<br>        <br>    4.  相册写入失败：Toast：`**保存失败，请重试**`；按钮恢复可点击<br>        <br>    5.  存储空间不足：Toast：`设备存储空间不足，无法保存`；按钮恢复可点击<br>        <br>    6.  重复点击：首次流程结束前，忽略后续点击，不重复请求权限或写入相册<br>        <br>2.  **订单状态需要及时刷新**<br>    <br>    1.  订单已支付、已取消等，立即刷新订单状态，**不得重复支付**（有可能通过CC发的二维码直接支付了，需要及时刷新数据） | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/b4d57cbb-0f18-4f49-880b-edb962ec2f25.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/48a7ecc0-5eae-4cff-a01e-5e5427e0c277.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/7ae9a69f-82da-4c40-b525-54535acd8bbe.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/377a0df2-9121-46dd-a90d-aa13c2c323ce.png) |

### 6.6 订单详情

| 模块 | 功能 | 描述 | 示意图 |
| --- | --- | --- | --- |
| 订单详情 | 订单详情 | 1.  字段<br>    <br>    1.  当前状态：当前订单状态<br>        <br>    2.  ~~购买人头像~~<br>        <br>    3.  ~~购买人名称~~<br>        <br>    4.  「待支付」状态的订单详情<br>        <br>        1.  展示“取消订单”按钮：逻辑&交互同列表<br>            <br>        2.  展示「微信支付」&「支付宝」按钮：逻辑&交互同列表<br>            <br>    5.  课包名称<br>        <br>    6.  课程名称<br>        <br>    7.  商品数量（课时数量）<br>        <br>    8.  商品金额（原价）<br>        <br>    9.  实付金额<br>        <br>    10.  订单编号<br>        <br>    11.  下单时间<br>        <br>    12.  支付时间（无支付时间，则展示“-”）<br>        <br>2.  其他规则<br>    <br>    1.  金额统一保留两位小数，格式为 `¥ 0.00`。<br>        <br>    2.  点击返回按钮回到订单列表，并保留离开前的状态筛选。 | ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/456c1c93-b474-457c-a12b-d6cd58d9ce4f.png)<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/5VLqXL5x20NAYqX1/img/387dcfd7-9d81-4587-9aa4-6d634a3c3c91.png) |

## 7. 审核中屏蔽两个入口

## 8. 横屏与设备适配要求

*   设备支持手机、pad；
    
*   系统支持ios15及以上，安卓9及以上
    

## 9. 加载、空态与异常处理

| 场景 | 产品表现 |
| --- | --- |
| 列表为空 | 展示对应空态文案，不显示错误提示<br>**“暂无课时”/“暂无订单”** |
| 网络失败 | 展示“**加载失败，请重试**”及「重试」按钮 |
| 重复点击 | 页面跳转期间禁止重复触发 |

## 10. 埋点需求

公参：student\_id：student\_id、device\_info ：Pad / Phone、channel：渠道id 等（参考优学现在的公参）

| event\_id\_ | event | 埋点说明 | 参数 |
| --- | --- | --- | --- |
| `profile_asset_entry_click` | page\_click\_viptrack | 点击我的课时或我的订单 |  |
| `lesson_type_click` | page\_click\_viptrack | 点击课时详情 | `lesson_type`\=智学/智学体验 |
| `~~lesson_validity_click~~` | ~~page\_click\_viptrack~~ | ~~点击去查看（有效期）~~ | `~~lesson_type~~` |
| `lesson_filter_change` | page\_click\_viptrack | 切换课时记录筛选 | `primary_filter`\=全部、获得、消耗<br>`secondary_filter`\=全部获得、购买获得、赠送获得 |
| `lesson_validity_click` | page\_click\_viptrack | 点击切换有效期详情tab |  |
| `order_filter_change` | page\_click\_viptrack | 切换订单状态 | `order_status` |
| `order_card_click` | page\_click\_viptrack | 点击订单卡片 | `order_id`、`order_status` |
| `order_detail_view` | $pageview | 订单详情曝光 | `order_id`、`order_status` |
| `order_cancel_button_view` | $pageview | 可取消订单的“取消订单”按钮有效曝光 | `order_id`<br>`page_source`\=订单列表、订单详情 |
| `order_cancel_click` | page\_click\_viptrack | 点击“取消订单” | `order_id`<br>`page_source`\=订单列表、订单详情 |
| `order_cancel_dialog_view` | $pageview | 取消订单二次确认弹窗曝光 | `order_id`<br>`page_source`\=订单列表、订单详情 |
| `order_cancel_dialog_dismiss` | page\_click\_viptrack | 点击“暂不取消”或关闭确认弹窗 | `order_id`<br>`dismiss_method`\=暂不取消、关闭弹窗<br>`page_source`\=订单列表、订单详情 |
| `order_cancel_confirm_click` | page\_click\_viptrack | 点击“确认取消”并发起取消请求 | `order_id`<br>`page_source`\=订单列表、订单详情 |
| `order_cancel_result` | $pageview | 取消订单接口返回结果 | `order_id`<br>`page_source`\=订单列表、订单详情<br>`result`\=success、fail |
| `payment_qr_save_button_view` | $pageview | “保存二维码”按钮有效曝光 | `order_id`<br>`payment_channel`\=微信、支付宝 |
| `payment_qr_save_click` | page\_click\_viptrack | 点击“保存二维码” | `order_id`、`payment_channel` |
| `payment_qr_save_permission_result` | $pageview | 系统相册权限请求返回 | `order_id`<br>`payment_channel`<br>`permission_result=无、受限、完全` |
| `payment_qr_permission_guide_view` | $pageview | 已拒绝权限引导弹窗曝光 | `order_id`<br>`payment_channel` |
| `payment_qr_permission_settings_click` | page\_click\_viptrack | 点击“去设置” | `order_id`<br>`payment_channel` |
| `payment_qr_permission_settings_return` | $pageview | 从系统设置返回并完成权限复查 | `order_id`<br>`payment_channel`<br>`permission_result=无、受限、完全` |
| `payment_qr_save_result` | $pageview | 二维码保存完成或失败 | `order_id`<br>`payment_channel`<br>`result`\=success、fail<br>`error_code` |
| `payment_qr_long_press` | $pageview | 长按二维码被触发（用户长按支付二维码并达到识别阈值） | `order_id`、`payment_channel` |

## 11. 验收标准

### 11.1 我的课时

*   [ ] 个人中心“我的课时”入口可点击且跳转正确。
    
*   [ ] 展示双师智学课和双师智学体验课两类课时。
    
*   [ ] 每类课时展示余额和精确到秒的有效期。
    
*   [ ] “去查看”可进入有效期详情。
    
*   [ ] “剩余课时”可进入课时流水。
    
*   [ ] 全部、获得、消耗及获得来源筛选结果正确。
    

### 11.2 我的订单

*   [ ] 个人中心“我的订单”入口可点击且跳转正确。
    
*   [ ] 五种订单状态均可筛选且选中状态清晰。
    
*   [ ] 状态数量与列表结果一致。
    
*   [ ] 点击订单卡片可进入正确订单详情。
    
*   [ ] 返回后保留原订单筛选状态。
    
*   [ ] 金额、数量、编号和时间显示符合格式要求。
    
*   [ ] 二维码可正常保存
    
*   [ ] 相册权限获取逻辑正常
    

## 12. 上线依赖

### 依赖

*   课时余额、批次及流水接口。
    
*   订单列表和订单详情接口。
    
*   订单与课时类型、来源、状态枚举定义。