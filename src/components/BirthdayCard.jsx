import { motion } from "motion/react";
import { useState } from "react";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { TypingAnimation } from "./ui/typing-animation";

export function BirthdayCard({ onFinish }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="font-['Pacifico'] relative bg-white/90 backdrop-blur-md 
                   rounded-3xl p-5 shadow-2xl border border-pink-200 
                   z-10 max-w-lg w-full flex flex-col "
      >
        {/* Header với emoji + text căn giữa */}
        <div className="flex items-center justify-center gap-3 ">
          <span className="text-3xl md:text-4xl">💌</span>
          <AnimatedGradientText
            className="text-3xl md:text-4xl font-bold pt-5 pb-5 pr-2"
            gradient={{ from: "#ec4899", to: "#38bdf8" }}
          >
            Thiệp Sinh Nhật
          </AnimatedGradientText>
          <span className="text-3xl md:text-4xl">💌</span>
        </div>

        <div className="max-h-[500px] h-300 overflow-y-auto px-2 scroll-pretty">
          {/* Typing text */}
          <TypingAnimation
            startOnView
            className="whitespace-pre-line text-gray-700 
                     text-lg leading-relaxed mt-2 px-4"
            duration={60}
            delay={2000}
          >
            {`Helluuu vợ yêu dấu của anh! 🎉🎂💖  

Hôm nay là một ngày thật đặc biệt, ngày mà một cô gái tuyệt vời xuất hiện trên thế giới này, để rồi sau này trở thành người anh thương yêu nhất. Anh thật sự cảm thấy may mắn và biết ơn vì đã gặp được vợ, được đồng hành cùng vợ trong hành trình đầy màu sắc này.  \n
Anh chúc vợ trong tuổi mới sẽ luôn rạng rỡ, xinh đẹp, lúc nào cũng nở nụ cười hạnh phúc trên môi. Mong rằng sức khỏe của vợ sẽ luôn dồi dào để có thể thoải mái tận hưởng cuộc sống, và theo đuổi đến cùng những ước mơ lớn lao mà vợ ấp ủ. Anh tin rằng với nghị lực, sự cố gắng và trái tim mạnh mẽ của vợ, không điều gì có thể ngăn cản được bước chân của vợ cả. ✨  \n
Cảm ơn vợ vì đã luôn ở bên cạnh anh, vợ không chỉ là một người yêu mà còn là một người bạn đồng hành, một chỗ dựa tinh thần, một nguồn động lực lớn lao. Có vợ, anh thấy cuộc sống này ấm áp và ý nghĩa hơn rất nhiều. Từng khoảnh khắc bên vợ, dù nhỏ bé hay giản dị nhất, cũng đều trở thành những kỷ niệm mà anh luôn muốn giữ mãi trong tim. 🥰  \n
Anh mong rằng trong năm mới này của vợ, chúng ta sẽ cùng nhau viết thêm nhiều câu chuyện đẹp, những chuyến đi, những lần cùng nhau vượt qua khó khăn, những buổi hẹn hò dễ thương, những kỷ niệm lãng mạn bất ngờ mà anh muốn dành cho vợ. Dù tương lai có thử thách thế nào, anh hứa sẽ luôn nắm chặt tay vợ, ở bên cạnh vợ, yêu thương và che chở vợ vô điều kiện.\n
Vợ yêu à, chúc mừng sinh nhật vợ! 🥳💕  
Yêu vợ nhiều lắm luôn! - Chồng iuu của vợ`}
          </TypingAnimation>
        </div>

        {/* Nút */}
        <div className="mt-8 mb-2 flex items-center justify-center">
          <motion.button
            onClick={() => onFinish()}
            className="px-6 py-2 bg-gradient-to-r from-pink-300 via-pink-200 to-blue-200 
                       text-pink-900 font-semibold rounded-full shadow-lg 
                       hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 130 }} // hiện sau khi thư gõ xong
          >
            ✨ Xem tiếp bất ngờ ✨
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
