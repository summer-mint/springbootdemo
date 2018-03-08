package springbootdemo.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import springbootdemo.com.Entity.User;

public interface Userdao extends JpaRepository<User,Integer>{

	
	 List<User> findByUsername(String username);
	
	 User findById(int id);

	 @Query("select p from User p where p.username=:name and p.password=:password")
	 User withusernameAnpasswordQuery(@Param("name") String username, @Param("password") String password);
}
