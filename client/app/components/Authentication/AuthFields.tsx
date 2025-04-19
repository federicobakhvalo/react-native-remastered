import React, { FC, useState } from "react";
import { View, Text } from "react-native";

type isReg = {
  isReg: boolean;
};

// const AuthFields: FC<isReg> = ({ isReg = false }) => {
// 	  const [email, setEmail] = useState<string>("");
// 	  const [password, setPassword] = useState<string>("");
// 	  const [repeatPassword, setRepeatPassword] = useState<string>("");
// 	return <>
// 		<View style={styles.flex}>
//         <MaterialIcons name="email" size={20} color="white" />
//         <InputTextField
//           label="Email"
//           value={email}
//           onChange={setEmail}
//           error={error}
//           placeholder="Enter your email"
//         />
//       </View>
//       <View style={styles.flex}>
//         <MaterialIcons name="lock" size={20} color="white" />
//         <InputTextField
//           label="password"
//           value={password}
//           onChange={setPassword}
//           error={error}
//           secureTextEntry={true}
//           placeholder="Enter your password"
//         />
//       </View>
//       {IsReg && (
//         <View style={styles.flex}>
//           <MaterialIcons name="lock" size={20} color="white" />
//           <InputTextField
//             label="password"
//             value={repeatPassword}
//             onChange={setRepeatPassword}
//             error={error}
//             secureTextEntry={true}
//             placeholder="Repeat your password"
//           />
//         </View>
//       )}
// 	</>

// export default AuthFields;
