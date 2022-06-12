---
title: "SICP 問題 4.31"
published: 2016/01/09
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>f a <span class="synSpecial">(</span>b lazy<span class="synSpecial">)</span> c <span class="synSpecial">(</span>d lazy-memo<span class="synSpecial">))</span>
  ...<span class="synSpecial">)</span>
</pre>


<p>といった形で部分的に遅延評価やメモ化する遅延評価を実装する．<br/>
　<br/>
元となるのは4.30までで作っていた遅延評価器．<br/>
まず変更した部分を書く．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; メモ化する評価器</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>force-it obj<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>thunk? obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>thunk-exp obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>thunk-env obj<span class="synSpecial">)))</span> <span class="synComment">;;メモ化しない遅延</span>
        <span class="synSpecial">((</span>thunk-memo? obj<span class="synSpecial">)</span> <span class="synComment">;;メモ化する遅延</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>result <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>thunk-exp obj<span class="synSpecial">)</span>
                                     <span class="synSpecial">(</span>thunk-env obj<span class="synSpecial">))))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> obj <span class="synSpecial">'</span>evaluated-thunk<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> obj<span class="synSpecial">)</span> result<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> obj<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
           result<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>evaluated-thunk? obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>thunk-value obj<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> obj<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delay-it <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>thunk <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>           <span class="synComment">;;これはそのまま</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delay-memo-it <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>thunk-memo <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span> <span class="synComment">;;thunk-memoにする</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>thunk<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk-memo? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>thunk-memo<span class="synSpecial">))</span> <span class="synComment">;;追加</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk-exp thunk<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> thunk<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk-env thunk<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> thunk<span class="synSpecial">))</span>

<span class="synComment">;; apply</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>my-apply procedure arguments env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>primitive-procedure? procedure<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>apply-primitive-procedure
          procedure
          <span class="synSpecial">(</span>list-of-arg-values arguments env<span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>compound-procedure? procedure<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>eval-sequence
          <span class="synSpecial">(</span>procedure-body procedure<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>extend-environment <span class="synSpecial">(</span>procedure-parameters procedure<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>list-of-args-thunk-or-values
                               <span class="synSpecial">(</span>origin-procedure-parameters procedure<span class="synSpecial">)</span> arguments env<span class="synSpecial">)</span> <span class="synComment">;;仮引数のリストも渡す</span>
                              <span class="synSpecial">(</span>procedure-environment procedure<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown procedure type: APPLY&quot;</span> procedure<span class="synSpecial">))))</span>

<span class="synComment">;; 変更なし</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-of-arg-values exps env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>no-operands? exps<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>first-operand exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>list-of-arg-values <span class="synSpecial">(</span>rest-operands exps<span class="synSpecial">)</span> env<span class="synSpecial">))))</span>

<span class="synComment">;; 一番目の仮引数を見て，pairならlazyかlazy-memoのどちらか調べてthunk or thunk-memoにする．</span>
<span class="synComment">;; pairでなければactual-valueして仮引数に束縛する．</span>
<span class="synComment">;; procedure-parametersではpairなら(a lazy)のような形をaに変えて渡す．</span>
<span class="synComment">;; origin-procedure-parametersはそのまま渡す．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-of-args-thunk-or-values parameters exps env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>no-operands? exps<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span>first-parameter parameters<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">pair?</span> first<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>lazy? first<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>delay-it <span class="synSpecial">(</span>first-operand exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                            <span class="synSpecial">(</span>list-of-args-thunk-or-values <span class="synSpecial">(</span>rest-parameters parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span>rest-operands exps<span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
                     <span class="synSpecial">((</span>lazy-memo? first<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>delay-memo-it <span class="synSpecial">(</span>first-operand exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span> <span class="synComment">;;遅延させてメモ化する</span>
                            <span class="synSpecial">(</span>list-of-args-thunk-or-values <span class="synSpecial">(</span>rest-parameters parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span>rest-operands exps<span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
                     <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;require lazy or lazy-memo option, but get &quot;</span> first<span class="synSpecial">))))</span>
              <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>first-operand exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                          <span class="synSpecial">(</span>list-of-args-thunk-or-values <span class="synSpecial">(</span>rest-parameters parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span>rest-operands exps<span class="synSpecial">)</span> env<span class="synSpecial">)))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-parameter parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> parameters<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rest-parameters parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> parameters<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lazy? parameter<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> parameter<span class="synSpecial">)</span> <span class="synSpecial">'</span>lazy<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lazy-memo? parameter<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> parameter<span class="synSpecial">)</span> <span class="synSpecial">'</span>lazy-memo<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>origin-procedure-parameters procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> procedure<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>procedure-parameters p<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span> x<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> p<span class="synSpecial">)))</span>

<span class="synComment">;; lazyとlazy-memoを基本手続きに追加してeq?で</span>
<span class="synError">マッチできるようにした．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> primitive-procedures
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>car <span class="synIdentifier">car</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cdr <span class="synIdentifier">cdr</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cons <span class="synIdentifier">cons</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>null? <span class="synIdentifier">null?</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>= <span class="synIdentifier">=</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>+ <span class="synIdentifier">+</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>* <span class="synIdentifier">*</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>/ <span class="synIdentifier">/</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>newline <span class="synIdentifier">newline</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>display <span class="synIdentifier">display</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>lazy <span class="synSpecial">'</span>lazy<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>lazy-memo <span class="synSpecial">'</span>lazy-memo<span class="synSpecial">)))</span>
</pre>


<p>テスト</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 遅延評価自体のテスト</span>
<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>try a <span class="synSpecial">(</span>b lazy<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> a <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">1</span> b<span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
ok

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>try <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synConstant">1</span> <span class="synConstant">0</span><span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>try <span class="synSpecial">(</span>a lazy-memo<span class="synSpecial">)</span> b<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> b <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">1</span> a<span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
ok

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>try <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synConstant">1</span> <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">1</span>
</pre>


<p>lazyもlazy-memoのどちらの評価も遅延されている．
次にメモ化のテストをする．<br/>
ここでは<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D5%A5%A3%A5%DC%A5%CA%A5%C3%A5%C1%BF%F4%CE%F3">フィボナッチ数列</a>の計算をさせる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; まずは作用的順序の評価</span>
<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fib n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>a <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>b <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>count n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span>
        a
        <span class="synSpecial">(</span>iter b <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">)))))</span>
<span class="synComment">;(time (actual-value input the-global-environment))</span>
<span class="synComment">; real   0.000</span>
<span class="synComment">; user   0.000</span>
<span class="synComment">; sys    0.000</span>

<span class="synComment">;;; M-Eval value:</span>
ok

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">10000</span><span class="synSpecial">)</span>
<span class="synComment">;(time (actual-value input the-global-environment))</span>
<span class="synComment">; real   0.200</span>
<span class="synComment">; user   0.210</span>
<span class="synComment">; sys    0.000</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">33644764876431783266621612005107543310302148460680063906564769974680081442166662368155595513633734025582065332680836159373734790483865268263040892463056431887354544369559827491606602099884183933864652731300088830269235673613135117579297437854413752130520504347701602264758318906527890855154366159582987279682987510631200575428783453215515103870818298969791613127856265033195487140214287532698187962046936097879900350962302291026368131493195275630227837628441540360584402572114334961180023091208287046088923962328835461505776583271252546093591128203925285393434620904245248929403901706233888991085841065183173360437470737908552631764325733993712871937587746897479926305837065742830161637408969178426378624212835258112820516370298089332099905707920064367426202389783111470054074998459250360633560933883831923386783056136435351892133279732908133732642652633989763922723407882928177953580570993691049175470808931841056146322338217465637321248226383092103297701648054726243842374862411453093812206564914032751086643394517512161526545361333111314042436854805106765843493523836959653428071768775328348234345557366719731392746273629108210679280784718035329131176778924659089938635459327894523777674406192240337638674004021330343297496902028328145933418826817683893072003634795623117103101291953169794607632737589253530772552375943788434504067715555779056450443016640119462580972216729758615026968443146952034614932291105970676243268515992834709891284706740862008587135016260312071903172086094081298321581077282076353186624611278245537208532365305775956430072517744315051539600905168603220349163222640885248852433158051534849622434848299380905070483482449327453732624567755879089187190803662058009594743150052402532709746995318770724376825907419939632265984147498193609285223945039707165443156421328157688908058783183404917434556270520223564846495196112460268313970975069382648706613264507665074611512677522748621598642530711298441182622661057163515069260029861704945425047491378115154139941550671256271197133252763631939606902895650288268608362241082050562430701794976171121233066073310059947366875</span>

<span class="synComment">;; 次は遅延評価</span>
<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fib-lazy n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">(((</span>a lazy<span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>b lazy<span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>count lazy<span class="synSpecial">)</span> n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> count <span class="synConstant">0</span><span class="synSpecial">)</span>
        a
        <span class="synSpecial">(</span>iter b <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> count <span class="synConstant">1</span><span class="synSpecial">)))))</span>
<span class="synComment">;(time (actual-value input the-global-environment))</span>
<span class="synComment">; real   0.000</span>
<span class="synComment">; user   0.000</span>
<span class="synComment">; sys    0.000</span>

<span class="synComment">;;; M-Eval value:</span>
ok

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>fib-lazy <span class="synConstant">30</span><span class="synSpecial">)</span>
<span class="synComment">;(time (actual-value input the-global-environment))</span>
<span class="synComment">; real   7.277</span>
<span class="synComment">; user   7.440</span>
<span class="synComment">; sys    0.020</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">832040</span>

<span class="synComment">;; メモ化された遅延評価のテスト</span>
<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fib-lazy-memo n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">(((</span>a lazy-memo<span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>b lazy-memo<span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>count lazy-memo<span class="synSpecial">)</span> n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> count <span class="synConstant">0</span><span class="synSpecial">)</span>
        a
        <span class="synSpecial">(</span>iter b <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> count <span class="synConstant">1</span><span class="synSpecial">)))))</span>
<span class="synComment">;(time (actual-value input the-global-environment))</span>
<span class="synComment">; real   0.000</span>
<span class="synComment">; user   0.000</span>
<span class="synComment">; sys    0.000</span>

<span class="synComment">;;; M-Eval value:</span>
ok

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>fib-lazy-memo <span class="synConstant">30</span><span class="synSpecial">)</span>
<span class="synComment">;(time (actual-value input the-global-environment))</span>
<span class="synComment">; real   0.001</span>
<span class="synComment">; user   0.000</span>
<span class="synComment">; sys    0.000</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">832040</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>fib-lazy-memo <span class="synConstant">10000</span><span class="synSpecial">)</span>
<span class="synComment">;(time (actual-value input the-global-environment))</span>
<span class="synComment">; real   0.234</span>
<span class="synComment">; user   0.250</span>
<span class="synComment">; sys    0.010</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">33644764876431783266621612005107543310302148460680063906564769974680081442166662368155595513633734025582065332680836159373734790483865268263040892463056431887354544369559827491606602099884183933864652731300088830269235673613135117579297437854413752130520504347701602264758318906527890855154366159582987279682987510631200575428783453215515103870818298969791613127856265033195487140214287532698187962046936097879900350962302291026368131493195275630227837628441540360584402572114334961180023091208287046088923962328835461505776583271252546093591128203925285393434620904245248929403901706233888991085841065183173360437470737908552631764325733993712871937587746897479926305837065742830161637408969178426378624212835258112820516370298089332099905707920064367426202389783111470054074998459250360633560933883831923386783056136435351892133279732908133732642652633989763922723407882928177953580570993691049175470808931841056146322338217465637321248226383092103297701648054726243842374862411453093812206564914032751086643394517512161526545361333111314042436854805106765843493523836959653428071768775328348234345557366719731392746273629108210679280784718035329131176778924659089938635459327894523777674406192240337638674004021330343297496902028328145933418826817683893072003634795623117103101291953169794607632737589253530772552375943788434504067715555779056450443016640119462580972216729758615026968443146952034614932291105970676243268515992834709891284706740862008587135016260312071903172086094081298321581077282076353186624611278245537208532365305775956430072517744315051539600905168603220349163222640885248852433158051534849622434848299380905070483482449327453732624567755879089187190803662058009594743150052402532709746995318770724376825907419939632265984147498193609285223945039707165443156421328157688908058783183404917434556270520223564846495196112460268313970975069382648706613264507665074611512677522748621598642530711298441182622661057163515069260029861704945425047491378115154139941550671256271197133252763631939606902895650288268608362241082050562430701794976171121233066073310059947366875</span>
</pre>


<p>遅延評価，メモ化ともに正常に働いている．<br/>
最後にこの評価器のソースを貼っておく．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> true <span class="synConstant">#t</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> false <span class="synConstant">#f</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>lookup-variable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>let-&gt;combination <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>let*? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>let*-&gt;nested-lets <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>letrec? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>letrec-&gt;let <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span> <span class="synComment">;;letrecを追加</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>and? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-and <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>or? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-or <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>my-apply <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                   env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type --EVAL&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synComment">;; メモ化する評価器</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>force-it obj<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>thunk? obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>thunk-exp obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>thunk-env obj<span class="synSpecial">)))</span> <span class="synComment">;;メモ化しない遅延</span>
        <span class="synSpecial">((</span>thunk-memo? obj<span class="synSpecial">)</span> <span class="synComment">;;メモ化する遅延</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>result <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>thunk-exp obj<span class="synSpecial">)</span>
                                     <span class="synSpecial">(</span>thunk-env obj<span class="synSpecial">))))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> obj <span class="synSpecial">'</span>evaluated-thunk<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> obj<span class="synSpecial">)</span> result<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> obj<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
           result<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>evaluated-thunk? obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>thunk-value obj<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> obj<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delay-it <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>thunk <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>           <span class="synComment">;;これはそのまま</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delay-memo-it <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>thunk-memo <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span> <span class="synComment">;;thunk-memoにする</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>thunk<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk-memo? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>thunk-memo<span class="synSpecial">))</span> <span class="synComment">;;追加</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk-exp thunk<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> thunk<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk-env thunk<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> thunk<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>evaluated-thunk? obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? obj <span class="synSpecial">'</span>evaluated-thunk<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk-value evaluated-thunk<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> evaluated-thunk<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>actual-value <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>force-it <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)))</span>

<span class="synComment">;; apply</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>my-apply procedure arguments env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>primitive-procedure? procedure<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>apply-primitive-procedure
          procedure
          <span class="synSpecial">(</span>list-of-arg-values arguments env<span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>compound-procedure? procedure<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>eval-sequence
          <span class="synSpecial">(</span>procedure-body procedure<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>extend-environment <span class="synSpecial">(</span>procedure-parameters procedure<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>list-of-args-thunk-or-values
                               <span class="synSpecial">(</span>origin-procedure-parameters procedure<span class="synSpecial">)</span> arguments env<span class="synSpecial">)</span> <span class="synComment">;;仮引数のリストも渡す</span>
                              <span class="synSpecial">(</span>procedure-environment procedure<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown procedure type: APPLY&quot;</span> procedure<span class="synSpecial">))))</span>

<span class="synComment">;; 変更なし</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-of-arg-values exps env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>no-operands? exps<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>first-operand exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>list-of-arg-values <span class="synSpecial">(</span>rest-operands exps<span class="synSpecial">)</span> env<span class="synSpecial">))))</span>

<span class="synComment">;; 一番目の仮引数を見て，pairならlazyかlazy-memoのどちらか調べてthunk or thunk-memoにする．</span>
<span class="synComment">;; pairでなければactual-valueして仮引数に束縛する．</span>
<span class="synComment">;; procedure-parametersではpairなら(a lazy)のような形をaに変えて渡す．</span>
<span class="synComment">;; origin-procedure-parametersはそのまま渡す．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-of-args-thunk-or-values parameters exps env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>no-operands? exps<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span>first-parameter parameters<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">pair?</span> first<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>lazy? first<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>delay-it <span class="synSpecial">(</span>first-operand exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                            <span class="synSpecial">(</span>list-of-args-thunk-or-values <span class="synSpecial">(</span>rest-parameters parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span>rest-operands exps<span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
                     <span class="synSpecial">((</span>lazy-memo? first<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>delay-memo-it <span class="synSpecial">(</span>first-operand exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span> <span class="synComment">;;遅延させてメモ化する</span>
                            <span class="synSpecial">(</span>list-of-args-thunk-or-values <span class="synSpecial">(</span>rest-parameters parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span>rest-operands exps<span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
                     <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;require lazy or lazy-memo option, but get &quot;</span> first<span class="synSpecial">))))</span>
              <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>first-operand exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                          <span class="synSpecial">(</span>list-of-args-thunk-or-values <span class="synSpecial">(</span>rest-parameters parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span>rest-operands exps<span class="synSpecial">)</span> env<span class="synSpecial">)))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-parameter parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> parameters<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rest-parameters parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> parameters<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lazy? parameter<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> parameter<span class="synSpecial">)</span> <span class="synSpecial">'</span>lazy<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lazy-memo? parameter<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> parameter<span class="synSpecial">)</span> <span class="synSpecial">'</span>lazy-memo<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>origin-procedure-parameters procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> procedure<span class="synSpecial">))</span>

<span class="synComment">;; 条件式</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>true? <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>if-predicate <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>if-consequent <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>if-alternative <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>

<span class="synComment">;; 並び</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-sequence exps env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>last-exp? exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>first-exp exps<span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>first-exp exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>rest-exps exps<span class="synSpecial">)</span> env<span class="synSpecial">))))</span>

<span class="synComment">;; 代入</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>set-variable-value! <span class="synSpecial">(</span>assignment-variable <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                       <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>assignment-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                       env<span class="synSpecial">)</span>
  <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>

<span class="synComment">;; 定義</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>define-variable!
    <span class="synSpecial">(</span>definition-variable <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>definition-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
    env<span class="synSpecial">)</span>
  <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>

<span class="synComment">;; 自己評価式</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">number?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> true<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">string?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> true<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> false<span class="synSpecial">)))</span>

<span class="synComment">;; 変数</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synComment">;; クオート</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>quote<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> tag<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> tag<span class="synSpecial">)</span>
      false<span class="synSpecial">))</span>

<span class="synComment">;; 代入</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>set!<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>assignment-variable <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>assignment-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synComment">;; 定義</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>define<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>definition-variable <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">caadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>definition-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span>make-lambda <span class="synSpecial">(</span><span class="synIdentifier">cdadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synComment">;;仮パラメタ</span>
                   <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span> <span class="synComment">;;本体</span>

<span class="synComment">;; lambda式</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>lambda<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-lambda parameters body<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>lambda <span class="synSpecial">(</span><span class="synIdentifier">cons</span> parameters body<span class="synSpecial">)))</span>

<span class="synComment">;; if</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>if<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>if-predicate <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>if-consequent <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>if-alternative <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cadddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">'</span>false<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-if predicate consequent alternative<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>if predicate consequent alternative<span class="synSpecial">))</span>

<span class="synComment">;; begin</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>begin<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>last-exp? seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> seq<span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-exp seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> seq<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rest-exps seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> seq<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sequence-&gt;exp seq<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> seq<span class="synSpecial">)</span> seq<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>last-exp? seq<span class="synSpecial">)</span> <span class="synSpecial">(</span>first-exp seq<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>make-begin seq<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-begin seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>begin seq<span class="synSpecial">))</span>


<span class="synComment">;; 任意の合成式</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>no-operands? ops<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> ops<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-operand ops<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> ops<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rest-operands ops<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> ops<span class="synSpecial">))</span>

<span class="synComment">;; 派生式</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>cond<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond-else-clause? clause<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>cond-predicate clause<span class="synSpecial">)</span> <span class="synSpecial">'</span>else<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond-predicate clause<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> clause<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond-actions clause<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clause<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>expand-clauses <span class="synSpecial">(</span>cond-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expand-clauses clauses<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> clauses<span class="synSpecial">)</span>
      <span class="synSpecial">'</span>false
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span><span class="synIdentifier">car</span> clauses<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>rest <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>cond-else-clause? first<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> rest<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>sequence-&gt;exp <span class="synSpecial">(</span>cond-actions first<span class="synSpecial">))</span>
                <span class="synSpecial">(</span>error <span class="synConstant">&quot;ELSE clause isn't last -- COND-&gt;IF&quot;</span> clauses<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>action <span class="synSpecial">(</span>cond-actions first<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>predicate <span class="synSpecial">(</span>cond-predicate first<span class="synSpecial">)))</span>
              <span class="synSpecial">(</span>make-if predicate
                       <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> action<span class="synSpecial">)</span> <span class="synSpecial">'</span>=&gt;<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> action<span class="synSpecial">)</span> predicate<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>sequence-&gt;exp action<span class="synSpecial">))</span>
                       <span class="synSpecial">(</span>expand-clauses rest<span class="synSpecial">)))))))</span>

<span class="synComment">;; and</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>and? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>and<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>and-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-and <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>clauses <span class="synSpecial">(</span>and-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> clauses<span class="synSpecial">)</span>
        <span class="synSpecial">'</span>true
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> clauses<span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">))</span> first<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>first <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">'</span>false<span class="synSpecial">))))))</span>


<span class="synComment">;; or</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>or? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>or<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>or-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-or <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>clauses <span class="synSpecial">(</span>or-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> clauses<span class="synSpecial">)</span>
        <span class="synSpecial">'</span>false
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> clauses<span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">))</span> first<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>first <span class="synSpecial">'</span>true<span class="synSpecial">)</span>
                <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">))))))))</span>


<span class="synComment">;; let</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>let<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">(</span>let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cadr</span> <span class="synSpecial">(</span>let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-&gt;combination <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span> <span class="synComment">;; 2番目の要素がシンボルならnamed-let</span>
      <span class="synSpecial">(</span>named-let-&gt;define <span class="synSpecial">(</span>named-let-func-name <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>named-let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>named-let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>named-let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-lambda <span class="synSpecial">(</span>let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synComment">;; let*</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>let*<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">(</span>let*-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cadr</span> <span class="synSpecial">(</span>let*-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-let parameters bodys<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>let <span class="synSpecial">(</span><span class="synIdentifier">cons</span> parameters bodys<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*-&gt;nested-lets <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>expand-lets <span class="synSpecial">(</span>let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expand-lets parameters bodys<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;EXPAND-LETS required pair, but &quot;</span> parameters<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> parameters<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>make-let <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> parameters<span class="synSpecial">))</span>
                   bodys<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>make-let <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> parameters<span class="synSpecial">))</span>
                        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>expand-lets <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> parameters<span class="synSpecial">)</span> bodys<span class="synSpecial">))))))</span>


<span class="synComment">;; named-let</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-func-name <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">(</span>named-let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cadr</span> <span class="synSpecial">(</span>named-let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-definition variable value<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>define variable value<span class="synSpecial">))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-&gt;define func-name variables expressions bodys<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-begin <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>make-definition func-name <span class="synSpecial">(</span>make-lambda variables bodys<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span><span class="synIdentifier">cons</span> func-name expressions<span class="synSpecial">))))</span>

<span class="synComment">;; letrec</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>letrec<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">(</span>letrec-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cadr</span> <span class="synSpecial">(</span>letrec-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec-&gt;let <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-let <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> x <span class="synSpecial">''</span><span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
                 <span class="synSpecial">(</span>letrec-variables <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>set! x y<span class="synSpecial">))</span>
                         <span class="synSpecial">(</span>letrec-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>letrec-expressions <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>letrec-body <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synComment">;; 術後のテスト</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>true? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> x <span class="synSpecial">'</span><span class="synConstant">#f</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>false? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> x <span class="synSpecial">'</span><span class="synConstant">#f</span><span class="synSpecial">))</span>

<span class="synComment">;; 手続きの表現</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-procedure parameters body env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>procedure parameters <span class="synSpecial">(</span>scan-out-defines body<span class="synSpecial">)</span> env<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compound-procedure? p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? p <span class="synSpecial">'</span>procedure<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>procedure-parameters p<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span> x<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> p<span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>procedure-body p<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> p<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>procedure-environment p<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadddr</span> p<span class="synSpecial">))</span>

<span class="synComment">;; 環境に対する操作</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>enclosing-environment env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> env<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> env<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> the-empty-environment <span class="synSpecial">'())</span>

<span class="synComment">;; フレーム</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-frame variables <span class="synIdentifier">values</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> variables <span class="synIdentifier">values</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> frame<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> frame<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-binding-to-frame! var val frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> frame <span class="synSpecial">(</span><span class="synIdentifier">cons</span> var <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> frame <span class="synSpecial">(</span><span class="synIdentifier">cons</span> val <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">))))</span>

<span class="synComment">;; 変数を値に対応づける新しいフレーム</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extend-environment vars vals base-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vals<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-frame vars vals<span class="synSpecial">)</span> base-env<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vals<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>error <span class="synConstant">&quot;Too many arguments supplied&quot;</span> vars vals<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>error <span class="synConstant">&quot;Too few arguments supplied&quot;</span> vars vals<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup-variable-value var env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>env-loop env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan vars vals<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> vars<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>env-loop <span class="synSpecial">(</span>enclosing-environment env<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> var <span class="synSpecial">(</span><span class="synIdentifier">car</span> vars<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> vals<span class="synSpecial">)</span> <span class="synSpecial">'</span><span class="synConstant">*unassigned*</span><span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>error <span class="synConstant">&quot;*Unassigned* variable&quot;</span> var<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">car</span> vals<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>scan <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> env the-empty-environment<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unbound variable&quot;</span> var<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>scan <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>env-loop env<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-variable-value! var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>env-loop env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan vars vals<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> vars<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>env-loop <span class="synSpecial">(</span>enclosing-environment env<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> var <span class="synSpecial">(</span><span class="synIdentifier">car</span> vars<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> vals val<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>scan <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> env the-empty-environment<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unbound variable -- SET!&quot;</span> var<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>scan <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>env-loop env<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>define-variable! var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan vars vals<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> vars<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>add-binding-to-frame! var val frame<span class="synSpecial">))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> var <span class="synSpecial">(</span><span class="synIdentifier">car</span> vars<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> vals val<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>scan <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span>scan <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-procedure? proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? proc <span class="synSpecial">'</span>primitive<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-implementation proc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> proc<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> primitive-procedures
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>car <span class="synIdentifier">car</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cdr <span class="synIdentifier">cdr</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cons <span class="synIdentifier">cons</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>null? <span class="synIdentifier">null?</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>= <span class="synIdentifier">=</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>+ <span class="synIdentifier">+</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>* <span class="synIdentifier">*</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>/ <span class="synIdentifier">/</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>newline <span class="synIdentifier">newline</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>display <span class="synIdentifier">display</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>lazy <span class="synSpecial">'</span>lazy<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>lazy-memo <span class="synSpecial">'</span>lazy-memo<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-procedure-names<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> primitive-procedures<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-procedure-objects<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>proc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>primitive <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> proc<span class="synSpecial">)))</span>
       primitive-procedures<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-primitive-procedure proc args<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>apply-in-underlying-scheme
   <span class="synSpecial">(</span>primitive-implementation proc<span class="synSpecial">)</span> args<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> apply-in-underlying-scheme <span class="synIdentifier">apply</span><span class="synSpecial">)</span>

<span class="synComment">;; 環境</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>setup-environment<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>initial-env
         <span class="synSpecial">(</span>extend-environment <span class="synSpecial">(</span>primitive-procedure-names<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>primitive-procedure-objects<span class="synSpecial">)</span>
                             the-empty-environment<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span>true <span class="synConstant">#t</span> initial-env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span>false <span class="synConstant">#f</span> initial-env<span class="synSpecial">)</span>
    initial-env<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> the-global-environment <span class="synSpecial">(</span>setup-environment<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> input-prompt <span class="synConstant">&quot;;;; M-Eval input:&quot;</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> output-prompt <span class="synConstant">&quot;;;; M-Eval value:&quot;</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>driver-loop<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>prompt-for-input input-prompt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>input <span class="synSpecial">(</span><span class="synIdentifier">read</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>output <span class="synSpecial">(</span>time <span class="synSpecial">(</span>actual-value input the-global-environment<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span>announce-output output-prompt<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>user-print output<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>driver-loop<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>prompt-for-input <span class="synIdentifier">string</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synIdentifier">string</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>announce-output <span class="synIdentifier">string</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synIdentifier">string</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>user-print object<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>compound-procedure? object<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>compound-procedure
                     <span class="synSpecial">(</span>procedure-parameters object<span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>procedure-body object<span class="synSpecial">)</span>
                     <span class="synSpecial">'</span><span class="synConstant">&lt;procedure-env&gt;</span><span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">display</span> object<span class="synSpecial">)))</span>

<span class="synComment">;; lambda式</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>lambda<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-lambda parameters body<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>lambda <span class="synSpecial">(</span><span class="synIdentifier">cons</span> parameters body<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>def-body-list proc-body<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>proc-body proc-body<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>def <span class="synSpecial">'())</span>
             <span class="synSpecial">(</span>body <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> proc-body<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> def<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> body<span class="synSpecial">)))</span>
          <span class="synSpecial">((</span>definition? <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">))</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body<span class="synSpecial">)</span>
                                               <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">)</span> def<span class="synSpecial">)</span>
                                               body<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body<span class="synSpecial">)</span>
                      def
                      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">)</span> body<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan-out-defines body<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>split-def-body proc-body<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>proc-body proc-body<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>def <span class="synSpecial">'())</span>
               <span class="synSpecial">(</span>body <span class="synSpecial">'()))</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> proc-body<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> def<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> body<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span>definition? <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">))</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body<span class="synSpecial">)</span>
                                                 <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">)</span> def<span class="synSpecial">)</span>
                                                 body<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body<span class="synSpecial">)</span>
                        def
                        <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">)</span> body<span class="synSpecial">))))))</span>
  <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>def-body-list <span class="synSpecial">(</span>split-def-body body<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>def-list <span class="synSpecial">(</span><span class="synIdentifier">car</span> def-body-list<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>body-list <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> def-body-list<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> def-list<span class="synSpecial">)</span>
        body
        <span class="synSpecial">(</span><span class="synIdentifier">append</span>  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>make-definition <span class="synSpecial">(</span>definition-variable x<span class="synSpecial">)</span> <span class="synSpecial">''</span><span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
                    def-list<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>set! <span class="synSpecial">(</span>definition-variable x<span class="synSpecial">)</span>
                                        <span class="synSpecial">(</span>definition-value x<span class="synSpecial">)))</span>
                      def-list<span class="synSpecial">)</span>
                 body-list<span class="synSpecial">))))</span>
</pre>


