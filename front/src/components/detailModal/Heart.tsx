import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import React from 'react';
const heartVariants = {
  initial: {
    scale: 0.7,
    transition: { duration: 0.2 },
  },
  visible: {
    scale: 1.1,
    transition: { duration: 0.3 },
  },
  leaving: {
    scale: 0.7,
    transition: { duration: 0.2 },
  },
};
interface HeartProps {
  onToggleLike: () => Promise<void>;
  fill: 'true' | 'false';
}
const Heart = ({ onToggleLike, fill }: HeartProps) => {
  return (
    <div>
      {fill === 'true' ? (
        <motion.div
          style={{ marginTop: '3px' }}
          variants={heartVariants}
          initial="initial"
          animate="visible"
          exit="leaving"
          key="HeartFilled"
        >
          <HeartFilled onClick={onToggleLike} style={{ fontSize: '1.3rem', color: '#eb3f96' }} />
        </motion.div>
      ) : (
        <motion.div
          style={{ marginTop: '3px' }}
          variants={heartVariants}
          initial="initial"
          animate="visible"
          exit="leaving"
          key="HeartOutlined"
        >
          <HeartOutlined onClick={onToggleLike} style={{ fontSize: '1.3rem', color: '#eb3f96' }} />
        </motion.div>
      )}
    </div>
  );
};

export default Heart;
