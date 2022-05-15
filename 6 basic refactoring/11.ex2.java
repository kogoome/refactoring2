// 명령줄 프로그램 쪼개기(자바)

JSON 파일에 담긴 주문의 개수를 세는 자바 프로그램을 살펴보자.

{ try { if (args. length = 0) throw new RuntimeException("a20 91274|| 9."); String filename = args[args. Length - 1]; File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order [] orders = mapper.readValue(input, Order[].class); if (Stream of (args). anyMatch(arg -> "-1".equals(arg))) System.out.println(Stream.of orders) .filter(o -> "ready".equals(o.status)) .count(); else System.out.println(orders.length); } catch (Exception e) { System.err.println(e); System.exit(1); } }

이 프로그램은 명령줄에서 실행할 때 주문이 담긴 파일 이름을 인수로 받는다. 이때 옵션인 -r플래그를 지정하면 "ready" 상태인 주문 센다.

public static void main(String[] args)

220 리팩터링(2판)


주문을 읽는 부분은 잭슨 라이브러리를 이용했다. ObjectMapper는 각 JSON 레코드를 간단히 public 데이터 필드로 구성된 자바 객체로 매핑한다. JSON 레코드의 status 필드는 Order 클래스의 public 필드인 status에 매핑되는 식이다. 잭슨 라이브러리는 이보다 정교한 JSON 매핑도 제공하지만, 이 예시와 관련이 없으므로 따로 설명하지 않겠다.

이 코드는 두 가지 일을 한다. 하나는 주문 목록을 읽어서 개수를 세고, 다른 하나는 명령줄 인수를 담은 배열을 읽어서 프로그램의 동작을 결정한다. 따라서 단계 쪼개기 리팩터링의 대상으로 적합하다. 첫 번째 단계는 명령줄 인수의 구문을 분석해서 의미를 추출한다. 두 번째 단계는 이렇게 추출된 정보를 이용하여 데이터를 적절히 가공한다. 이렇게 분리해두면, 프로그램에서 지정할 수 있는 옵션이나 스위치가 늘어나더라도 코드를 수정하기 쉽다.

그런데 단계 쪼개기와 상관없는 작업부터 할 것이다. 리팩터링할 때는 테스트를 작성하고 자주 수행해야 하지만, 자바로 작성된 명령줄 프로그램은 테스트하기가 고통스럽다. 매번 JVM을 구동해야 하는데 그 과정이 느리고 복잡하기 때문이다. 특히 메이븐 Matem의 단점을 싫어한다면 고통이 배가된다. 이 문제를 개선하려면 일반적인 JUnit 호출로 자바 프로세스 하나에서 테스트할 수 있는 상태로 만들면 된다. 이를 위해 먼저 핵심 작업을 수행하는 코드 전부를 함수로 추출 11절한다.

- public static void main(String[] args) { try { run(args); } catch (Exception e) { System.err.println(e); System.exit(1); } }

static void run(String[] args) throws IOException { if (args. length == 0) throw new RuntimeException("파일명을 입력하세요."); String filename = args[args. length - 1]; File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order[].class);

https://github.com/Faster XML/jackson

Chapter 06 - 기본적인 리팩터링

Split Phase 6.11 단계 쪼개기

221


if (Stream.of(args).anyMatch(arg -> "-r".equals(arg))) System.out.println(Stream. of (orders) .filter(o -> "ready".equals(o.status)) .count()); else System.out.println(orders.length); }

run() 메서드를 테스트 코드에서 쉽게 호출할 수 있도록 접근 범위를 패키지로 설정했다. 이로써 이 메서드를 자바 프로세스 안에서 호출할 수 있지만, 결과를 받아보려면 표준 출력으로 보내는 방식을 수정해야 한다. 이 문제는 System.out을 호출하는 문장을 호출한 곳으로 옮겨 4해결한다.

public static void main(String[] args) { try {

System.out.println(run(args)); } catch (Exception e) {

System.err.println(e);

System.exit(1); } }

static long run(String[] args) throws IOException { if (args.length = 0) throw new RuntimeException("파일명을 입력하세요."); String filename = args[args. Length - 1]; File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper. readValue(input, Order().class); if (Stream.of(args).anyMatch(arg -> "r".equals(arg)))) return Stream of (orders).filter(o -> "ready".equals(o.status)).count(); else return orders.length; }

이렇게 하면 기존 동작을 망치지 않으면서 run() 메서드를 검사하는 JUnit 테스트를 작성할 수 있다. 이로써 명령줄에서 매번 자바 프로세스를 새로 띄울 때보다 훨씬 빨라졌다. 지금까지의 단계는 리팩터링 시 중요하다. 테스트가 느리거나 불편하면 리팩터링 속도가 느려지고 오류가 생길 가능성도 커진다. 따라서 먼저 테스트를 쉽게 수행할 수 있도록 수정한 다음에 리팩터

222 리팩터링(2판)


링하는 게 좋다.

이번 예에서는 명령줄 호출과 표준 출력에 쓰는 느리고 불편한 작업과 자주 테스트해야 할 복잡한 동작을 분리함으로써 테스트를 더 쉽게 수행하게 만들었다. 이 원칙을 흔히 험블 객체 패턴't mile hited Patent 이라 한다. 단, 여기서는 객체가 아니라 main() 메서드에 적용했다. main()에 담긴 로직을 최대한 간소하게 만들어서 문제가 생길 여지가 줄인 것이다.

이제 단계를 쪼갤 준비가 끝났다. ① 가장 먼저 할 일은 두 번째 단계에 해당하는 코드를 독립된 메서드로 추출하는 것이다. 그래서 다음과 같이 수정한다.

static long run(String[] args) throws IOException { if (args.length == 0) throw new RuntimeException("파일명을 입력하세요."); String filename = args[args.length - 1]; return countOrders(args, filename); }0.

private static long countOrders(String[] args, String filename) throws IOException { File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order[].class); if (Stream.of(args).anyMatch(arg -> "".equals(arg))) return Stream.of(örders).filter(o -> "ready".equals(o.status)).count(); else. return orders. Length; }

③ 다음으로 중간 데이터 구조를 추가한다. 레코드는 단순한 게 좋은데, 자바이므로 클래스로 구현한다.

static long run(String[] args) throws IOException { if (args. length == 0) throw new RuntimeException("파일명을 입력하세요."); CommandLine commandLine = new CommandLine(); String filename = args[args. length - 1); return countOrders (commandLine, args, filename); private static long countOrders(CommandLine commandLine, String[] args, String filename)

https://martinfowler.com/books/meszaros.html

Chapter 06 - 기본적인 리팩터링

Split Phase| 6.11 단계 쪼개기

223


throws IOException { File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order[].class); if (Stream.of (args). anyMatch(arg -> "-".equals(arg))) return Stream.of (orders).filter(o -> "ready".equals(o.status)).count(); else return orders.length; }

private static class Command Line {}

⑤ 이제 두 번째 단계 메서드인 countOrders()로 전달되는 다른 인수들을 살펴본다. args부터 보자. args는 첫 번째 단계에서 사용하는데, 이를 두 번째 단계에까지 노출하는 건 적절치 않다. 지금 단계를 쪼개는 목적이 args를 사용하는 부분을 모두 첫 번째 단계로 분리하는 것이기 때문이다.

args를 처리하기 위해 가장 먼저 할 일은 이 값을 사용하는 부분을 찾아서 그 결과를 추출하는이다. 여기서는 단 한 번, 개수를 세는 코드가 "ready" 상태인 주문만 세는지 확 데..용하므로 이 조건식을 변수로 추출 3 질한다.

static long run(String[] args) throws IOException { if (args. length = 0) throw new RuntimeException("파일명을 입력하세요."); CommandLine command Line = new CommandLine(); String. filename = args[args.length - 1]; return countOrders (command Line, args, filename); }

private static long countOrders(CommandLine commandLine, String[] args, String filename) throws IOException { File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order[].class); boolean onlyCountReady = Stream.of(args). anyMatch(arg -> "-r".equals(arg)); if (onlyCountReady) return Stream.of(orders).filter(o -> "ready".equals(o.status)).count(); else return orders. length; }

224 리팩터링(2판)


private static class CommandLine()

그런 다음 이 값을 중간 데이터 구조로 옮긴다.

static long run(String[] args) throws IOException { if (args. length == 0) throw new RuntimeException(" 0921419."); CommandLine commandLine = new CommandLine(); String filename = args[args. length - 1]; return countOrders(commandLine, args, filename); }

private static long countOrders(CommandLine commandLine, String[] args, String filename)

throws IOException { File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order[].class); commandLine.onlyCountReady = Stream of (args). anyMatch(arg -> "--".equals(arg)); if (commandLine.onlyCountReady)

return Stream.of(orders).filter(o -> "ready".equals(o.status)).count(); else

return orders. Length; }

private static class CommandLine {

boolean onlyCountReady; }

여기서는 CommandLine에 public 필드로 두는 방식을 택했다. 평소에는 꺼리는 방식이지만 이 예에서는 사용되는 범위가 좁기 때문에 문제가 없다.

다음으로 onlyCountReady에 값을 설정하는 문장을 호출한 곳으로 옮긴다. 4 질

static long run(String[] args) throws IOException { if (args.length == 0) throw new RuntimeException("T1991|19."); CommandLine commandLine = new ConmandLine(); String filename = args[args.length - 1]; commandLine.onlyCountReady = Stream.of(args). anyMatch(arg -> "-1".equals(arg)); return countOrders (commandLine, args, filename);

Chapter 06 - 기본적인 리팩터링

Split Phase 6.11 단계 쪼개기

225


private static long countOrders(CommandLine command Line, String[] args, String filename) throws IOException { File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper. readValue(input, Order().class); if (commandLine.onlyCountReady) return Stream.of(orders).filter(o -> "ready".equals(o.status)).count(); else return orders. Length; } private static class Command Line { boolean onlyCountReady; }

이어서 filename 매개변수를 중간 데이터 구조인 CommandLine 객체로 옮긴다.

String[] args) throws IOException { if (args.length = 0) throw new RuntimeException("ono 9195|19."); CommandLine commandLine = new CommandLine(); commandLine.filename = args[args. Length - 1]; commandline.onlyCountReady = Stream.of (args) anyMatch(arg -> "-r".equals(arg)); return countOrders(commandLine, filename); } private static long countOrders(CommandLine commandLine, String filename) throws IOException { File input = Paths.get(commandLine.filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order[].class); if (commandLine.onlyCountReady) return Stream.of(orders).filter(o -> "ready".equals(o.status)).count(); else return orders.length; }

static long run(

private static class CommandLine

boolean onlyCountReady,

String filename; }

226 리팩터링(2판)


매개변수 처리가 다 끝났다. ⑥ 이제 첫 번째 단계의 코드를 메서드로 추출한다.

static long run(String[] args) throws IOException { CommandLine commandLine = parseCommandLine(args); return countOrders (commandLine);

private static CommandLine parseCommandLine(String[] args) { if (args.length == %) throw new RuntimeException(" TO2||2."); CommandLine commandLine = new CommandLine(); commandLine.filename = args[args. Length - 1]; commandLine.onlyCountReady = Stream of (args). anyMatch(arg -> "-r".equals(arg)); return commandLine; }

private static long countOrders(CommandLine commandLine) throws IOException {

File input = Paths.get(commandLine.filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order().class); if (commandLine.onlyCountReady)

return Stream.of (orders).filter(o -> "ready".equals(o.status)).count(); else

return orders. Length; }

private static class Command Line {

boolean onlyCountReady;

String filename; }

단계 쪼개기 리팩터링의 핵심은 이 정도로 끝났다. 그런데 나라면 이름 바꾸기와 인라인하기로 조금 더 정리해야 직성이 풀린다.

static long run(String[] args) throws IOException {

return countOrders(parseCommandLine(args)); }

private static CommandLine parseCommandLine(String[] args) { if (args. Length = 0) throw new RuntimeException("120 121 || ..."); Command Line result = new CommandLine();

Chapter 06 - 기본적인 리팩터링

!

Split Phase| 6.11 단계 쪼개기

227


매개변수 처리가 다 끝났다. ⑥ 이제 첫 번째 단계의 코드를 메서드로 추출한다.

static long run(String[] args) throws IOException { CommandLine commandLine = parseCommandLine(args); return countOrders(commandLine); }

private static CommandLine parseCommandLine(String[] args) { if (args. Length == 0) throw new RuntimeException("092174|| 2.."); CommandLine commandLine = new CommandLine(); commandLine.filename = args[args. Length - 1]; commandLine.onlyCountReady = Stream of (args). anyMatch(arg -> "-r".equals(arg)); return command Line; }

private static long countOrders(CommandLine commandLine) throws IOException { File input = Paths.get(commandLine.filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order().class); if (comandLine.onlyCountReady) return Stream.of(orders).filter(o -> "ready".equals(o.status)).count(); else return orders. Length;

private static class Command Line {

boolean onlyCountReady;

String filename; }

단계 쪼개기 리팩터링의 핵심은 이 정도로 끝났다. 그런데 나라면 이름 바꾸기와 인라인하기로 조금 더 정리해야 직성이 풀린다.

static long run(String[] args) throws IOException {

return countOrders(parseCommandLine(args)); }

private static CommandLine parseCommandLine(String[] args) { if (args.length == 0) throw new RuntimeException(" TO

9246 || 8."); CommandLine result = new CommandLine();

Chapter 06 - 기본적인 리팩터링

Split Phase 6.11 단계포개기

227


result.filename = args[args. length - 1]; result.onlyCountReady = Stream.of(args). anyMatch(arg -> "-1".equals(arg)); return result; }

private static long countOrders(CommandLine commandLine) throws IOException { File input = Paths.get(commandLine.filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order[].class); if (commandLine.onlyCountReady) return Stream.of(orders).filter(o -> "ready".equals(o.status)).count(); else return orders.length; } private static class CommandLine { boolean onlyCountReady: String filename; }

이제 두 단계가 명확하게 분리됐다. parseCommandLine()은 오로지 명령줄 관련 작업만 처리하고, countOrders()는 실제로 처리할 작업만 수행한다. 이제 두 메서드를 독립적으로 테스트하기 쉬워졌다. 여기서 로직이 더 복잡해진다면 아마도 parseCommandLine()을 더 전문화된 라이브러리로 대체할 것이다.

예시: 첫 번째 단계에 변환기 사용하기(자바)

앞의 명령줄 예시에서는 첫 번째 단계에서 간단한 데이터 구조를 만들어서 두 번째 단계로 전달했다. 이렇게 하지 않고 명령줄 인수를 담은 문자열 배열을 두 번째 단계에 적합한 인터페이스로 바꿔주는 변환기 filisfornner 객체를 만들어도 된다.

이 방식을 설명하기 위해 앞 예시에서 두 번째 단계에 데이터를 전달할 CommandLine 객체를 생성하는 부분으로 돌아가보자.

-static long run(String[] args) throws IOException { if (args. length = 0) throw new RuntimeException("파일명을 입력하세요."); CommandLine command Line = new CommandLine(); String filename = args[args. length - 1];

228 리팩터링(2판)


return countOrders (commandLine, args, filename); }

private static long countOrders(CommandLine throws IOException { File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order[].class); if (Stream of (args). anyMatch(arg -> "--".equals(arg))) return Stream.of(orders).filter(o -> "ready".equals(o.status)).count(); else return orders.length; }

commandLine, String[] args, String filename)

private static class CommandLine {}

앞 예시에서는 동작을 포함할 수 있는 객체 대신 레코드 구조를 만들었기 때문에, 내부 클래스를 만들고 나중에 public 데이터 멤버로 채웠다. 하지만 다음과 같이 동작까지 포함하는 최상위 클래스로 빼내는 방법도 있다.

App 클래스.. static long run(String[] args) throws IOException { if (args. Length = 0) throw new RuntimeException("20 121 || 9."); CommandLine commandLine = new ConmandLine(); String filename = args[args. Length - 1]; return countOrders(commandline, args, filename); }

private static long countOrders(CommandLine commandLine, String[] args, String filename) throws IOException { File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper .readValue(input, Order[].class); if (Stream of (args). anyMatch(arg -> "--".equals(arg))) return Stream.of (orders).filter(o -> "ready".equals(o.status)).count(); else return orders.length; }

Chapter 06 - 기본적인 리팩터링 229

Split Phase6.11 단계 쪼개기


- CommandLine 클래스.... public class Command Line { String[] args; public CommandLine(String[] args) { this.args = args; } }

이 클래스는 생성자에서 인수 배열을 받아서 첫 단계 로직이 할 일을 수행한다. 즉, 입력받은 데이터를 두 번째 단계에 맞게 변환하는 메서드들을 제공할 것이다.

처리 과정을 확실히 이해하기 위해 countOrders()의 인수를 뒤에서부터 살펴보자. 먼저 filename이다. 이 인수에는 임시 변수를 질의 함수로 바꾸기 사지를 적용한다.

- App 클래스... static long run(String[] args) throws IOException { if (args. length = 0) throw new RuntimeException("파일명을 입력하세요."); CommandLine commiandLine = new CommandLine(args); return countOrders(commandLine, args, filename (args)); }

private static String filename(String[] args) {

return args[args. Length - 1]; }

private static long countOrders(CommandLine commandLine, String[] args, String filename) throws IOException { File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order[].class); if (Stream.of(args).anyMatch(arg -> "-".equals(arg))) return Stream.of(orders).filter(o -> "ready".equals(o.status)).count(); else return orders.length; }

바로 이어서 이 질의 메서드를 CommandLine 클래스로 옮긴다(함수 옮기기 전).

리팩터링(2판)

230


App 3214... static long run(String[] args) throws IOException { if (args. length = 0) throw new RuntimeException("20180126||.."); CommandLine command Line = new CommandLine(args); return countOrders(commandLine, args, commandLine.filename()); }

private static long countOrders(CommandLine commandLine, String[] args, String filename)

throws IOException { File input = Paths.get(filename).toFile(); ObjectMapper mapper = new ObjectMapper(); Order[] orders = mapper.readValue(input, Order[].class); if (Stream.of(args). anyMatch(arg -> "--".equals(arg)))

return Stream of (orders).filter(o -> "ready".equals(o.status)).count(); else

return orders. Length; }

- CommandLine A...

String[] args;

public CommandLine(String[] args) {

this.args = args; } String filename() {

return args[args. length - 1]; }

이제 함수 선언 바꾸기 : 5일로 countOrders()가 새로 만든 메서드를 사용하도록 고친다. App ... static long run(String[] args) throws IOException { if (args.length == ) throw new RuntimeException("DOS 91417|.."); ConmandLine commandLine = new CommandLine(args); return countOrders(commandLine, args, commandline.filename. -); } private static long countOrders(CommandLine commandLine, String[] args; String filename) throws IOException { File input = Paths.get(commandline.filename()).toFile();

Chapter 06 - 기본적인 리팩터링 231

Split Phase| 6.11 단계 쪼개기


ObjectMapper mapper = new ObjectMapper();
Order[] orders = mapper.readValue(input, Order[]/class);
if (Stram.of(args).anyMatch(arg->"-r".equals(arg)))
return Stram.of(orders).filter(o->"ready.equals(o.status)).count();
elsereturn orders.length
}

static long run(String[] args) throw IOException {
  if (args.length == 0) throw new RuntimeException("파일명을 입력하세요.");
  CommandLine commandLine = new CommandLine(args);
  return countOrders(commandLine, args);
}

private static long coutOrders(CommandLine commandLine, String[] args) throws IOException {
  File input = Path.get(commandLine.filename()).tiFile();
  ObjectMapper mapper = new CommandLine(args);
  return countOrders(commandLine, args);
}

private static long countOrders(CommandLine commandLine, String[] args) throw IOException {
  File input = Path.get(commandLine.filename()).toFile();
  ObjectMapper mapper = new ObjectMapper();
  Order[] orders = mapper.readValue(input, Order[].class);
  if (onluCountReady(args))
    return Stream.of(orders).filter(o->"ready".equals(o.status)).count();
  else
    return orders.length;
}

private static boolean onlyCountReady(String[] args) {
  return Stream.of(args).anyMatch(arg-> "-r".equals(arg));
}

그런 다음 이 메서드를 CommandLine 클래스로 옮기고 args 매개변수를 삭제한다.

--app 클래스
static long run(String[] args) throws IOException {
  if (args.length==0) throw new RuntimeException("파일명을 입력하세요.");
  CommandLine commandLine = new CommandLine(args);
  return countOrders(commandLine, args);
}

private static long countOrders(CommandLine commandLine, String[] args) throws IOException {
  File input = Path.get(commandLine.filename()).toFile();
  ObjectMapper mapper = new ObjectMapper();
  Order[] orders = mapper.readValue(input, Order[].class);
  if (commandLine.onlyCountReady())
    return Stream.of(orders).filter(o->"ready".equals(o.status)).count();
  else
    return orders.length;
}

--CommandLine 클래스

String[] args;

public CommandLine(String[] args){
  this.args = args;
}
String filename() {
  return args[args.length - 1];
}
boolean onlyCountReady() {
  return Stream.of(args).anyMatch(arg => "-r".equals(arg));
}

지금까지는 변환 로직을 새 클래스로 옮기는 방식으로 리팩터링했다. 추가로, 명령줄 인수가 존재하는지 검사하는 부분도 옮겨준다.(문장을 함수로 옮기기8.3절)

--app 클래스
static long run(String[] args) throws IOException {
  if (args.length == 0) throw new RuntimeException("파일명을 입력하세요.");
  CommandLine commandLine = enw CommandLine(args);
  return countOrders(commandLine);
}

private static long countOrders(CommandLine commandLine) throws IOException {
  File input = Paths.get(commandLine.filename()).toFile();
  ObjectMapper mapper = new ObjectMapper();
  Order[] orders = mapper.readValue(input, Order[].class);
  if (commandLine.onlyCountReady())
    return Stream.of(orders).filter(o->"ready".equals(o.status)).count();
  else
    return orders.length;
}


--CommandLine 클래스
String[] args;

public CommandLine(Sting[] args) {
  this.args = args;
  if (args.length == 0) throw new RuntimeException("파일명을 입력하세요.");
}
String filename() {
  return args[args.length - 1];
}
boolean onlyCountReady() {
  return Stream.of(args).anyMatch(arg->"-r".equals(arg));
}

나는 이렇게 단순한 데이터 구조는 사용하기 꺼리는 편이다. 하지만 이 예시처럼 순차적으로 실행되는 두 함수 사이에서 단순 통신용으로 사용하는 것처럼 제한된 문맥에서만 사용할 때는 개의치 않는다. 이렇게 객체를 변환기로 바꾸는 방식도 나름 장점이 있다. 나는 두 방식 중 어느 하나를 특별히 선호하지는 않는다. 핵심은 어디까지나 단계를 명확히 분리하는 데 있기 때문이다.
