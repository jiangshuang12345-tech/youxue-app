# 双师智学｜应用市场评分与问卷调研 PRD

| 项目 | 内容 |
| --- | --- |
| 文档版本 | V1.1 |
| 文档类型 | 产品需求文档（PRD） |
| 适用端 | 优学 App：iOS、Android 手机/平板；学习机另行配置，不默认触发市场评分 |
| 关联能力 | 双师智学课后报告、应用市场评分、吐槽问卷 H5、调研问卷、会员奖励 |

## 1. 背景与目标

优学需要同时获取用户的市场口碑与深度课程反馈，但两类能力服务不同目标：

- **应用市场评分**：面向完成良好学习体验的用户，在合适时机请求市场评分，提升口碑沉淀。
- **吐槽问卷 H5**：承接评分弹窗中的负反馈，收集全 App 功能点的体验问题和建议；无任何奖励。
- **调研问卷**：面向调研运营目标人群，收集双师智学课程体验的结构化反馈，并按既有活动规则发放问卷奖励。

本期保持**评分与既有调研问卷完全解耦**：评分弹窗中的“我要吐槽”仅进入新建的、无奖励的吐槽问卷 H5，绝不进入既有调研问卷弹窗或 H5；既有调研问卷的题目、触发、人群、频控和奖励规则均不变。

## 2. 产品原则

1. 评分弹窗只在用户完成明确正向学习成果后触发，本期唯一自动触发点为：**查看双师智学课后报告，且报告成绩为 B 及以上**。
2. 评分弹窗保留“**不好用，我要吐槽**”入口，点击后直接打开独立吐槽问卷 H5，不展示任何问卷邀请弹窗，也不发放奖励。
3. 既有调研问卷继续由独立活动触达；评分弹窗关闭、评分失败、评分次数用尽均不自动弹出既有调研问卷。
4. 不以市场评分星级、好评文本或评分完成作为发放任何会员、课时、定制币等奖励的条件；吐槽问卷提交同样无奖励。
5. 评分系统/市场是否真正展示最终评分面板由平台决定；客户端只控制“请求评分”的时机与业务频控。

## 3. 评分弹窗

### 3.1 触发条件

用户需同时满足：

- 进入双师智学某节课的**课后报告页**；
- 当前报告最终成绩为 **A、A-、B+、B**（简称“B 及以上”）；
- 本节课为正常完成，非补课取消、异常结束、试听中断或成绩缺失；
- 当前端支持并已配置对应的市场评分能力；
- 未命中评分频控、黑名单、未成年人/学习机排除规则；
- 当前页面停留至少 3 秒，且用户未立即返回。

### 3.2 不触发条件

- 报告成绩为 B 以下、未评级或报告加载失败；
- 用户正在支付、投诉、退款、客服会话、异常恢复或弱网重试流程中；
- 学习机儿童模式、无法识别市场来源、目标市场未安装或应用未上架；
- 同一节课已触发过评分候选；
- 达到评分业务频控或系统限制后。

### 3.3 弹窗交互

| 组件 | 内容 | 行为 |
| --- | --- | --- |
| 标题 | 喜欢优学吗？ | 固定文案 |
| 主操作 | 超喜欢，给个好评 | 请求对应市场评分能力 |
| 次操作 | 下次再说 | 关闭评分弹窗；进入冷却期 |
| 关闭按钮 | × | 与“下次再说”相同 |
| 负反馈入口 | 不好用，我要吐槽 | 直接进入吐槽问卷 H5；不经过既有调研问卷弹窗；无奖励 |

点击“超喜欢，给个好评”后，按渠道调用市场评分能力；点击“不好用，我要吐槽”后，结束本次评分弹窗并直接打开吐槽问卷 H5。两条路径互斥，均不触发既有调研问卷。

### 3.4 吐槽问卷 H5

| 项目 | 要求 |
| --- | --- |
| 问卷标识 | 新建 `feedback_survey_id`，与既有 `survey_campaign_id` 完全隔离 |
| 打开方式 | 评分弹窗点击“不好用，我要吐槽”后直接打开 App 内 WebView/H5，不展示“填写问卷，领取专属感谢礼”弹窗 |
| 问卷内容 | 覆盖整个 App 的功能点点评，例如课程学习、双师智学、AI 功能、会员订阅、课时/订单、个人中心、性能与稳定性；支持问题描述和截图/日志能力（如客户端已具备） |
| 奖励 | 无；页面、提交成功页和埋点不得出现会员、课时、定制币或其他奖励文案 |
| 透传参数 | `user_id`、`student_id`、`feedback_survey_id`、`source=rating_negative`、`channel`、`os`、`app_version`、`report_id`、`course_id` |
| 退出与失败 | 用户关闭、返回、加载失败或提交失败，只结束本次吐槽流程，不拉起既有调研问卷 |

吐槽问卷的题目、页面地址和启停状态由 `feedback_survey_id` 配置。它不是既有调研问卷的替代版本，**不得修改既有调研问卷的任何题目或配置**。

### 3.5 评分平台路由

客户端按**应用安装来源/渠道包标识**路由，而不是仅按手机品牌路由。

| 平台/渠道 | 优先方式 | 说明 |
| --- | --- | --- |
| iOS App Store | StoreKit `requestReview` | 系统内嵌评分请求；是否显示由系统决定。 |
| Google Play（如适用） | Play In-App Review API | Google 控制展示配额；不可假定每次都会展示。 |
| 华为应用市场 / HarmonyOS | 应用评论服务 | 满足 SDK、版本、上架与接入条件时，直接拉起评论。 |
| 荣耀应用市场 | 评论一键直达 | 满足接入条件时拉起评论窗口。 |
| OPPO 软件商店 | 应用评论调起能力 | 满足接入条件时在当前 App 拉起评论。 |
| 小米 / vivo 应用商店 | 跳转应用详情页或评论入口 | 以当前渠道协议与实机验证为准；失败则轻提示结束。 |
| 学习机 | 默认不请求市场评分 | 仅保留 App 内满意度或反馈能力；如厂商明确开放能力，再单独灰度。 |

### 3.6 评分频控

评分频控独立于问卷活动。建议使用下表默认值：

| 规则 | 默认值 |
| --- | --- |
| 单用户业务评分请求上限 | 3 次 / 365 天 |
| 两次评分请求最短间隔 | 30 天 |
| 同一课程报告的触发次数 | 1 次 |
| 点击“下次再说”后的冷却 | 7 天 |
| 点击“超喜欢”后的冷却 | 30 天 |

**平台限制优先：**iOS 系统最多会向同一用户展示 3 次评分请求/365 天；Google Play 的展示配额由 Google 管理且可能变化。客户端应在自身 3 次上限内请求，不得尝试绕过系统控制。

## 4. 既有调研问卷

### 4.1 独立触发与人群

既有调研问卷沿用当前活动运营配置，不依赖用户是否看过课后报告、是否触发评分、是否提交市场评分或吐槽问卷。默认触发点可为用户切换至“双师智学” Tab，具体由 `survey_campaign_id` 配置决定。

投放人群默认：双师在学用户，具有 CAI/TCAI 剩余课时且至少有 1 节完课记录；运营可在活动配置中增减人群规则。

### 4.2 问卷弹窗与填写链路

1. 命中当前问卷活动资格及频控后，展示“填写问卷，领取专属感谢礼”邀请弹窗。
2. 点击“去填写并领取”进入问卷 WebView，透传 `user_id`、`student_id`、`survey_campaign_id`、`source`、`channel`。
3. 服务端确认提交成功后，按活动奖励配置发放；成功页展示到账说明。
4. 关闭邀请、退出 WebView 或加载失败均不触发评分弹窗或吐槽问卷。

### 4.3 问卷频控与版本

| 规则 | 默认值 |
| --- | --- |
| 同一 `survey_campaign_id` 的弹窗上限 | 3 次 |
| 关闭邀请后的免打扰 | 当天不再弹当前问卷 |
| 问卷提交成功 | 停止当前问卷活动触达 |
| 更换问卷 | 创建新的 `survey_campaign_id`；新问卷弹窗次数从 0 计算 |
| 多次提交同一问卷 | 奖励仅发放一次 |

问卷版本变化只影响问卷活动计数和问卷奖励幂等；**不得重置、增加或消耗评分弹窗次数**。

## 5. 三类能力的关系

| 项目 | 应用市场评分 | 吐槽问卷 H5 | 既有调研问卷 |
| --- | --- | --- |
| 业务目标 | 市场口碑与满意度 | 收集负向产品体验 | 双师体验调研与运营触达 |
| 触发点 | 课后报告成绩 B 及以上 | 点击“不好用，我要吐槽” | 独立运营活动配置 |
| 标识/频控主键 | `user_id + rating_window` | `user_id + feedback_survey_id` | `user_id + survey_campaign_id` |
| 上限 | 3 次 / 365 天 | 不新增弹窗次数；仅由评分弹窗入口进入 | 每个活动最多 3 次 |
| 奖励 | 无 | 无 | 可配置，提交成功后发放 |
| 更换问卷的影响 | 无 | 更换 `feedback_survey_id` 不影响其他两类能力 | 新活动重新计数 |
| 与既有调研问卷关系 | 不跳转 | 不跳转 | 不跳转 |

评分弹窗与吐槽问卷是一个分支链路；评分与既有调研问卷则独立。为避免重复打扰：

1. 优先展示课后报告评分弹窗；
2. 用户点击“我要吐槽”后，只进入吐槽问卷 H5；当次会话不展示既有调研问卷邀请；
3. 若同一会话同时命中既有调研问卷资格，既有调研问卷等待下一次自身触发机会；
4. 评分/吐槽流程与既有调研问卷之间至少间隔 24 小时。

## 6. 状态与接口

### 6.1 评分状态

```text
user_id + rating_window
├── rating_request_count
├── last_rating_request_at
├── last_rating_dismiss_at
├── triggered_report_ids
├── market_channel
├── negative_feedback_opened_at
└── last_request_result
```

### 6.2 吐槽问卷状态

```text
user_id + feedback_survey_id
├── opened_at
├── submitted_at
├── last_exit_at
└── last_submit_result
```

### 6.3 既有调研问卷状态

```text
user_id + survey_campaign_id
├── survey_popup_count
├── last_survey_popup_at
├── day_suppressed_until
├── survey_submitted_at
└── reward_granted_at
```

评分请求、吐槽问卷提交、既有调研问卷提交和奖励发放均由服务端记录为跨设备权威状态；客户端仅用于短期展示和离线兜底。

## 7. 埋点设计

公共属性：`user_id`（脱敏）、`student_id`（脱敏）、`channel`、`device_brand`、`os`、`app_version`、`course_id`、`report_id`、`survey_campaign_id`、`feedback_survey_id`。

| event_id | 说明 | 关键属性 |
| --- | --- | --- |
| `rating_candidate_hit` | 课后报告评分资格判断 | `grade`, `result`, `reason` |
| `rating_popup_show` | 评分弹窗曝光 | `rating_request_count` |
| `rating_click_positive` | 点击市场评分 | `market_channel` |
| `rating_click_negative` | 点击“不好用，我要吐槽” | `feedback_survey_id` |
| `rating_request_result` | 市场评分能力请求结果 | `route_type`, `result`, `error_code` |
| `rating_dismiss` | 下次再说或关闭 | `dismiss_type` |
| `feedback_survey_open` | 打开吐槽问卷 H5 | `feedback_survey_id`, `source=rating_negative` |
| `feedback_survey_submit` | 吐槽问卷提交结果 | `feedback_survey_id`, `result`, `error_code` |
| `feedback_survey_exit` | 退出吐槽问卷 | `exit_type` |
| `survey_candidate_hit` | 问卷资格判断 | `survey_campaign_id`, `result`, `reason` |
| `survey_popup_show` | 问卷邀请曝光 | `survey_popup_count` |
| `survey_invite_click` | 点击填写问卷 |  |
| `survey_submit_confirmed` | 服务端确认问卷提交 |  |
| `survey_reward_grant` | 奖励发放结果 | `result`, `reward_type` |

## 8. 验收标准

1. 仅当用户查看双师智学课后报告且成绩为 B 及以上时，才会进入评分候选判断。
2. 评分弹窗展示“超喜欢，给个好评”“不好用，我要吐槽”“下次再说”和关闭按钮；点击“我要吐槽”直接进入新建吐槽问卷 H5。
3. 评分业务请求最多 3 次/365 天，且单节课报告最多触发一次。
4. 吐槽问卷 H5 使用独立 `feedback_survey_id`，其内容覆盖整个 App 功能点；不会展示既有调研问卷邀请页、不会进入既有问卷 H5、不会发放奖励。
5. 既有调研问卷的题目、触发规则、`survey_campaign_id` 计数和奖励规则保持不变；更换该问卷后仅重置新 `survey_campaign_id` 的计数。
6. 评分、吐槽问卷与既有调研问卷不共用计数；吐槽问卷的关闭、失败、提交均不改变既有调研问卷状态。
7. 同一会话不连续展示评分/吐槽流程与既有调研问卷；两类流程最少间隔 24 小时。
8. 学习机默认不拉起市场评分，评分资格、路由失败、吐槽问卷与既有问卷奖励均有完整埋点。

## 9. 风险与待确认事项

- 课后报告成绩枚举需由课程/数据团队确认，明确 B、B+、A-、A 的判定字段与异常值。
- iOS、华为、荣耀、OPPO 的 SDK 接入资格与线上可用版本需由客户端和渠道运营确认。
- 小米、vivo 的市场跳转协议及应用详情页可达性需在目标机型实测。
- 问卷系统需支持按 `survey_campaign_id` 回传提交状态，奖励服务需以 `user_id + survey_campaign_id + reward_type` 幂等。
- 新建吐槽问卷需确认 H5 地址、`feedback_survey_id` 的版本管理方式、支持的附件类型及隐私告知；其提交结果不得触发奖励服务。

## 10. 平台参考

- Apple StoreKit：Requesting App Store reviews — https://developer.apple.com/documentation/storekit/requesting-app-store-reviews
- Google Play：In-App Review API — https://developer.android.com/guide/playcore/in-app-review
- 华为：应用评论服务 — https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/appgallery-comment
- 荣耀：评论一键直达 — https://developer.honor.com/en/doc/guides/101566
- OPPO：应用评论调起能力接入指南 — https://open.oppomobile.com/new/developmentDoc/info?id=11038
