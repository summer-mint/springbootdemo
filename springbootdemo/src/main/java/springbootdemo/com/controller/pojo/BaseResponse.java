package springbootdemo.com.controller.pojo;

public class BaseResponse<T>{
	private int ResponseStatus;
	private String Message;
	private T Data;
	public int getResponseStatus() {
		return ResponseStatus;
	}
	public void setResponseStatus(int responseStatus) {
		ResponseStatus = responseStatus;
	}
	public String getMessage() {
		return Message;
	}
	public void setMessage(String Message) {
		this.Message = Message;
	}
	public T getData() {
		return Data;
	}
	public void setData(T data) {
		Data = data;
	}

}  