public class Main {

    public static void main(String[] args){
        if(args.length == 1){
            try{
                BotUtil.startBot(BotKind.valueOf(args[0]));
            }catch (IllegalArgumentException e){
                System.out.println("Could not read argument! Make sure the only argument is either User or Admin");
            }catch (InterruptedException e) {
                System.out.println("Thread got interrupted!");
            }
        }else{
            System.out.println("Could not determine what bot to start! Add Admin or User as an argument!");
        }
    }
}
